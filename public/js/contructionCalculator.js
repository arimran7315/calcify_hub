function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        console.log('Loading script:', src);
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}
// DOM element references for buttons
const calculateBtn = document.getElementById("calculateBtn");
const calculatingBtn = document.getElementById("calculatingBtn");
const resetBtn = document.getElementById("resetBtn");
const resetingBtn = document.getElementById("resetingBtn");

// Event listener for the Calculate button
calculateBtn.addEventListener("click", () => {
    // Toggle button visibility during calculation
    calculateBtn.classList.add("hidden");
    calculatingBtn.classList.remove("hidden");

    // Delay calculation to show loading state
    setTimeout(() => {
        calculateEstimate();
        calculateBtn.classList.remove("hidden");
        calculatingBtn.classList.add("hidden");
    }, 500);
});

// Event listener for the Reset button
resetBtn.addEventListener("click", () => {
    // Toggle button visibility during reset
    resetBtn.classList.add("hidden");
    resetingBtn.classList.remove("hidden");

    // Delay reset to show loading state
    setTimeout(() => {
        resetForm();
        resetBtn.classList.remove("hidden");
        resetingBtn.classList.add("hidden");
    }, 500);
});

// Material rates object with price, unit, and display format
const materialRates = {
    cement: { pricePerBag: 1300, unit: "bags", rateDisplay: "PKR 1,300/bag" },
    sand: { pricePerCuFt: 50, unit: "cu ft", rateDisplay: "PKR 50/cu ft" },
    aggregate: { pricePerCuFt: 100, unit: "cu ft", rateDisplay: "PKR 100/cu ft" },
    steel: { pricePerKg: 250, unit: "kg", rateDisplay: "PKR 250/kg" },
    bricks: { pricePerThousand: 14000, unit: "thousand", rateDisplay: "PKR 14,000/1000" },
    tiles: { pricePerSqFt: 200, unit: "sq ft", rateDisplay: "PKR 200/sq ft" },
    paint: { pricePerLiter: 800, unit: "liters", rateDisplay: "PKR 800/liter" },
    doors: { pricePerSqFt: 350, unit: "sq ft", rateDisplay: "PKR 350/sq ft" },
    windows: { pricePerSqFt: 600, unit: "sq ft", rateDisplay: "PKR 600/sq ft" },
    plumbing: { pricePerRoom: 25000, unit: "units", rateDisplay: "PKR 25,000/room" },
    electrical: { pricePerRoom: 30000, unit: "units", rateDisplay: "PKR 30,000/room" },
    labor: { pricePerSqFt: 300, unit: "sq ft", rateDisplay: "PKR 300/sq ft" },
};

// Conversion factors for different area units to square feet
const areaConversions = {
    squareFeet: 1,
    marla: 272.25,
    kanal: 5445,
    squareYards: 9,
    acre: 43560,
};

// Initialize material selection checkboxes
function initMaterialSelection() {
    const materialSelectionList = document.getElementById("materialSelectionList");
    materialSelectionList.innerHTML = ""; // Clear existing content

    // Create a checkbox for each material
    for (const material in materialRates) {
        materialSelectionList.innerHTML += `
            <div class="material-checkbox">
                <input type="checkbox" id="material_${material}" checked onchange="updateFloorInputs()">
                <label for="material_${material}">${material.charAt(0).toUpperCase() + material.slice(1)}</label>
            </div>
        `;
    }
}

// Show material selection and floor details sections
function showMaterialAndFloorDetails() {
    document.getElementById("materialSelection").classList.remove("hidden");
    document.getElementById("floorDetails").classList.remove("hidden");
}

// Reset the form to its initial state
function resetForm() {
    document.getElementById("estimatorForm").reset();
    document.getElementById("materialSelection").classList.add("hidden");
    document.getElementById("floorDetails").classList.add("hidden");
    document.getElementById("results").classList.add("hidden");
    document.getElementById("floorDetails").innerHTML = "";
    initMaterialSelection();
    updateFloorInputs();
}

// Update floor input fields based on number of floors and basement
function updateFloorInputs() {
    const numFloors = parseInt(document.getElementById("numFloors").value || 0) || 1;
    const hasBasement = document.getElementById("hasBasement").value === "yes";
    const floorDetails = document.getElementById("floorDetails");
    floorDetails.innerHTML = ""; // Clear existing floor details

    // Generate input fields for each floor (including basement if applicable)
    for (let i = hasBasement ? -1 : 0; i < numFloors; i++) {
        const floorName = i === -1 ? "Basement" : `Floor ${i + 1}`;
        const isTopFloor = i === numFloors - 1;

        floorDetails.innerHTML += `
            <div class="border p-4 rounded-lg bg-gray-50">
                <h3 class="font-medium mb-2 text-lg">${floorName} Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="heightFloor${i}" class="block text-sm font-medium text-gray-700">Height (ft)</label>
                        <input type="number" id="heightFloor${i}" min="8" step="0.1" value="10" class="mt-1 block w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="roomsFloor${i}" class="block text-sm font-medium text-gray-700">Number of Rooms</label>
                        <input type="number" id="roomsFloor${i}" min="0" step="1" class="mt-1 block w-full p-2 border rounded-md" required onkeyup="updateRoomDetails(${i})">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label for="wallWidthFloor${i}" class="block text-sm font-medium text-gray-700">Wall Width</label>
                        <select id="wallWidthFloor${i}" class="mt-1 block w-full p-2 border rounded-md">
                            <option value="4.5">4.5 inches (Interior)</option>
                            <option value="9" selected>9 inches (Exterior)</option>
                        </select>
                    </div>
                    ${isTopFloor ? `
                        <div>
                            <label for="isRoofFloor${i}" class="block text-sm font-medium text-gray-700">Is this the roof?</label>
                            <select id="isRoofFloor${i}" class="mt-1 block w-full p-2 border rounded-md" onchange="updateRoofHeight(${i})">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                    ` : ""}
                </div>
                <div id="roomDetailsFloor${i}" class="mt-4"></div>
            </div>
        `;
    }

    // Update room details for each floor
    for (let i = hasBasement ? -1 : 0; i < numFloors; i++) {
        updateRoomDetails(i);
    }
}

// Update room details inputs based on the number of rooms
function updateRoomDetails(floorIndex) {
    const numRooms = parseInt(document.getElementById(`roomsFloor${floorIndex}`).value) || 0;
    const roomDetailsDiv = document.getElementById(`roomDetailsFloor${floorIndex}`);
    const doorsChecked = document.getElementById("material_doors")?.checked;
    const windowsChecked = document.getElementById("material_windows")?.checked;

    roomDetailsDiv.innerHTML = ""; // Clear existing room details

    if (numRooms > 0 && (doorsChecked || windowsChecked)) {
        roomDetailsDiv.innerHTML += '<h4 class="font-medium text-gray-700 mb-2">Room Details</h4>';

        // Generate inputs for each room
        for (let room = 1; room <= numRooms; room++) {
            roomDetailsDiv.innerHTML += `
                <div class="border p-2 rounded-md bg-gray-100 mb-2">
                    <h5 class="text-sm font-medium text-gray-600">Room ${room}</h5>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        ${doorsChecked ? `
                            <div>
                                <label for="numDoorsRoom${room}Floor${floorIndex}" class="block text-sm font-medium text-gray-700">Number of Doors</label>
                                <input type="number" id="numDoorsRoom${room}Floor${floorIndex}" min="0" step="1" value="1" class="mt-1 block w-full p-2 border rounded-md" required onkeyup="updateDoorInputs(${floorIndex}, ${room})">
                            </div>
                            <div id="doorInputsRoom${room}Floor${floorIndex}" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"></div>
                        ` : ""}
                        ${windowsChecked ? `
                            <div>
                                <label for="numWindowsRoom${room}Floor${floorIndex}" class="block text-sm font-medium text-gray-700">Number of Windows</label>
                                <input type="number" id="numWindowsRoom${room}Floor${floorIndex}" min="0" step="1" value="1" class="mt-1 block w-full p-2 border rounded-md" required onkeyup="updateWindowInputs(${floorIndex}, ${room})">
                            </div>
                            <div id="windowInputsRoom${room}Floor${floorIndex}" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"></div>
                        ` : ""}
                    </div>
                </div>
            `;
            if (doorsChecked) updateDoorInputs(floorIndex, room);
            if (windowsChecked) updateWindowInputs(floorIndex, room);
        }
    }
}

// Update door input fields for a specific room
function updateDoorInputs(floorIndex, roomIndex) {
    const numDoors = parseInt(document.getElementById(`numDoorsRoom${roomIndex}Floor${floorIndex}`).value) || 0;
    const doorInputsDiv = document.getElementById(`doorInputsRoom${roomIndex}Floor${floorIndex}`);
    doorInputsDiv.innerHTML = ""; // Clear existing door inputs

    for (let door = 1; door <= numDoors; door++) {
        doorInputsDiv.innerHTML += `
            <div>
                <label for="doorHeightRoom${roomIndex}Floor${floorIndex}Door${door}" class="block text-sm font-medium text-gray-700">Door ${door} Height (ft)</label>
                <input type="number" id="doorHeightRoom${roomIndex}Floor${floorIndex}Door${door}" min="0" step="0.1" value="7" class="mt-1 block w-full p-2 border rounded-md" required>
            </div>
            <div>
                <label for="doorWidthRoom${roomIndex}Floor${floorIndex}Door${door}" class="block text-sm font-medium text-gray-700">Door ${door} Width (ft)</label>
                <input type="number" id="doorWidthRoom${roomIndex}Floor${floorIndex}Door${door}" min="0" step="0.1" value="3" class="mt-1 block w-full p-2 border rounded-md" required>
            </div>
        `;
    }
}

// Update window input fields for a specific room
function updateWindowInputs(floorIndex, roomIndex) {
    const numWindows = parseInt(document.getElementById(`numWindowsRoom${roomIndex}Floor${floorIndex}`).value) || 0;
    const windowInputsDiv = document.getElementById(`windowInputsRoom${roomIndex}Floor${floorIndex}`);
    windowInputsDiv.innerHTML = ""; // Clear existing window inputs

    for (let window = 1; window <= numWindows; window++) {
        windowInputsDiv.innerHTML += `
            <div>
                <label for="windowHeightRoom${roomIndex}Floor${floorIndex}Window${window}" class="block text-sm font-medium text-gray-700">Window ${window} Height (ft)</label>
                <input type="number" id="windowHeightRoom${roomIndex}Floor${floorIndex}Window${window}" min="0" step="0.1" value="5" class="mt-1 block w-full p-2 border rounded-md" required>
            </div>
            <div>
                <label for="windowWidthRoom${roomIndex}Floor${floorIndex}Window${window}" class="block text-sm font-medium text-gray-700">Window ${window} Width (ft)</label>
                <input type="number" id="windowWidthRoom${roomIndex}Floor${floorIndex}Window${window}" min="0" step="0.1" value="4" class="mt-1 block w-full p-2 border rounded-md" required>
            </div>
        `;
    }
}

// Adjust height input constraints for roof floors
function updateRoofHeight(floorIndex) {
    const isRoof = document.getElementById(`isRoofFloor${floorIndex}`).value === "yes";
    const heightInput = document.getElementById(`heightFloor${floorIndex}`);

    if (isRoof) {
        heightInput.value = "4";
        heightInput.min = "3.5";
        heightInput.max = "6";
    } else {
        heightInput.value = "10";
        heightInput.min = "8";
        heightInput.max = "";
    }
}

// Format currency in PKR with proper localization
function formatCurrency(amount) {
    return "PKR " + amount.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format numbers with specified decimal places
function formatNumber(number, decimals = 2) {
    return number.toLocaleString("en-PK", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Calculate the construction cost estimate
function calculateEstimate() {
    const plotArea = parseFloat(document.getElementById("plotArea").value);
    const areaUnit = document.getElementById("areaUnit").value;
    const numFloors = parseInt(document.getElementById("numFloors").value);
    const hasBasement = document.getElementById("hasBasement").value === "yes";
    const floorDetails = [];

    // Collect floor details
    for (let i = hasBasement ? -1 : 0; i < numFloors; i++) {
        const height = parseFloat(document.getElementById(`heightFloor${i}`).value);
        const rooms = parseInt(document.getElementById(`roomsFloor${i}`).value) || 0;
        const wallWidth = parseFloat(document.getElementById(`wallWidthFloor${i}`).value) / 12; // Convert inches to feet
        const isRoof = i === numFloors - 1 && document.getElementById(`isRoofFloor${i}`)?.value === "yes";
        const roomDetails = [];

        for (let room = 1; room <= rooms; room++) {
            const numDoors = document.getElementById(`numDoorsRoom${room}Floor${i}`) ? parseInt(document.getElementById(`numDoorsRoom${room}Floor${i}`).value) || 0 : 0;
            const numWindows = document.getElementById(`numWindowsRoom${room}Floor${i}`) ? parseInt(document.getElementById(`numWindowsRoom${room}Floor${i}`).value) || 0 : 0;
            const doorAreas = [];
            const windowAreas = [];

            for (let door = 1; door <= numDoors; door++) {
                const doorHeight = document.getElementById(`doorHeightRoom${room}Floor${i}Door${door}`) ? parseFloat(document.getElementById(`doorHeightRoom${room}Floor${i}Door${door}`).value) || 0 : 0;
                const doorWidth = document.getElementById(`doorWidthRoom${room}Floor${i}Door${door}`) ? parseFloat(document.getElementById(`doorWidthRoom${room}Floor${i}Door${door}`).value) || 0 : 0;
                doorAreas.push(doorHeight * doorWidth);
            }

            for (let window = 1; window <= numWindows; window++) {
                const windowHeight = document.getElementById(`windowHeightRoom${room}Floor${i}Window${window}`) ? parseFloat(document.getElementById(`windowHeightRoom${room}Floor${i}Window${window}`).value) || 0 : 0;
                const windowWidth = document.getElementById(`windowWidthRoom${room}Floor${i}Window${window}`) ? parseFloat(document.getElementById(`windowWidthRoom${room}Floor${i}Window${window}`).value) || 0 : 0;
                windowAreas.push(windowHeight * windowWidth);
            }

            roomDetails.push({ numDoors, doorAreas, numWindows, windowAreas });
        }

        floorDetails.push({ height, rooms, wallWidth, isRoof, roomDetails });
    }

    // Validate inputs
    if (!plotArea || !numFloors || floorDetails.some(floor => !floor.height || isNaN(floor.rooms))) {
        alert("Please fill in all required fields.");
        return;
    }

    // Convert plot area to square feet
    const plotAreaSqFt = plotArea * areaConversions[areaUnit];
    const totalFloors = hasBasement ? numFloors + 1 : numFloors;
    const coveredArea = plotAreaSqFt * totalFloors;

    // Brick dimensions (in feet)
    const brickDimensions = { length: 0.75, width: 0.375, height: 0.25 };

    // Initialize material quantities
    const foundationMaterials = {};
    const greyMaterials = {};
    const finishingMaterials = {};
    const selectedMaterials = Object.keys(materialRates).filter(material => document.getElementById(`material_${material}`).checked);

    // Calculate wall and room surface areas
    let totalWallArea = 2 * Math.sqrt(plotAreaSqFt) * 1.2; // Perimeter estimate
    let totalWallSurfaceArea = 0;
    let totalRoomSurfaceArea = 0;
    let totalBrickVolume = 0;

    for (const floor of floorDetails) {
        const perimeter = floor.isRoof ? totalWallArea * 0.7 : totalWallArea;
        totalWallSurfaceArea += perimeter * floor.height;
        totalRoomSurfaceArea += 100 * floor.rooms * floor.height;
        totalBrickVolume += (perimeter * floor.height + 100 * floor.rooms * floor.height) * floor.wallWidth;
    }

    const totalSurfaceArea = (totalWallSurfaceArea + totalRoomSurfaceArea) * 2;

    // Calculate foundation materials
    if (selectedMaterials.includes("cement") || selectedMaterials.includes("sand") || selectedMaterials.includes("aggregate") || selectedMaterials.includes("steel")) {
        const foundationVolume = plotAreaSqFt * (hasBasement ? 6 : 3) * 0.15;
        if (selectedMaterials.includes("cement")) foundationMaterials.cement = 0.15 * foundationVolume / 1.57;
        if (selectedMaterials.includes("sand")) foundationMaterials.sand = 0.3 * foundationVolume;
        if (selectedMaterials.includes("aggregate")) foundationMaterials.aggregate = 0.6 * foundationVolume;
        if (selectedMaterials.includes("steel")) foundationMaterials.steel = 7.5 * foundationVolume;
    }

    // Calculate grey structure materials (columns)
    if (selectedMaterials.includes("cement") || selectedMaterials.includes("sand") || selectedMaterials.includes("aggregate") || selectedMaterials.includes("steel")) {
        const columnVolume = 1 * Math.ceil(plotAreaSqFt / 100) * floorDetails.reduce((sum, floor) => sum + floor.height + 1, 0);
        if (selectedMaterials.includes("cement")) greyMaterials.cement = (greyMaterials.cement || 0) + 0.25 * columnVolume / 1.57;
        if (selectedMaterials.includes("sand")) greyMaterials.sand = (greyMaterials.sand || 0) + 0.5 * columnVolume;
        if (selectedMaterials.includes("aggregate")) greyMaterials.aggregate = (greyMaterials.aggregate || 0) + 0.75 * columnVolume;
        if (selectedMaterials.includes("steel")) greyMaterials.steel = (greyMaterials.steel || 0) + 12 * columnVolume;
    }

    // Calculate grey structure materials (slabs)
    if (selectedMaterials.includes("cement") || selectedMaterials.includes("sand") || selectedMaterials.includes("aggregate") || selectedMaterials.includes("steel")) {
        const slabVolume = 1 * (0.2 * plotAreaSqFt) * 1 * totalFloors;
        if (selectedMaterials.includes("cement")) greyMaterials.cement = (greyMaterials.cement || 0) + 0.25 * slabVolume / 1.57;
        if (selectedMaterials.includes("sand")) greyMaterials.sand = (greyMaterials.sand || 0) + 0.5 * slabVolume;
        if (selectedMaterials.includes("aggregate")) greyMaterials.aggregate = (greyMaterials.aggregate || 0) + 0.75 * slabVolume;
        if (selectedMaterials.includes("steel")) greyMaterials.steel = (greyMaterials.steel || 0) + 10 * slabVolume;
    }

    // Calculate grey structure materials (beams)
    if (selectedMaterials.includes("cement") || selectedMaterials.includes("sand") || selectedMaterials.includes("aggregate") || selectedMaterials.includes("steel")) {
        const beamVolume = 0.5 * coveredArea;
        if (selectedMaterials.includes("cement")) greyMaterials.cement = (greyMaterials.cement || 0) + 0.15 * beamVolume / 1.57;
        if (selectedMaterials.includes("sand")) greyMaterials.sand = (greyMaterials.sand || 0) + 0.3 * beamVolume;
        if (selectedMaterials.includes("aggregate")) greyMaterials.aggregate = (greyMaterials.aggregate || 0) + 0.6 * beamVolume;
        if (selectedMaterials.includes("steel")) greyMaterials.steel = (greyMaterials.steel || 0) + 5 * beamVolume;
    }

    // Calculate bricks
    if (selectedMaterials.includes("bricks")) {
        greyMaterials.bricks = totalBrickVolume / (brickDimensions.length * brickDimensions.width * brickDimensions.height) * 1.1 / 1000;
    }

    // Calculate plastering materials
    if (selectedMaterials.includes("cement") || selectedMaterials.includes("sand")) {
        if (selectedMaterials.includes("cement")) greyMaterials.cement = (greyMaterials.cement || 0) + 0.15 * totalSurfaceArea;
        if (selectedMaterials.includes("sand")) greyMaterials.sand = (greyMaterials.sand || 0) + 0.21 * totalSurfaceArea;
    }

    // Calculate finishing materials
    if (selectedMaterials.includes("tiles")) finishingMaterials.tiles = 1.1 * coveredArea;
    if (selectedMaterials.includes("paint")) finishingMaterials.paint = (totalSurfaceArea + coveredArea) / 100;

    // Calculate door and window areas
    let totalDoorArea = 0;
    let totalWindowArea = 0;
    for (const floor of floorDetails) {
        for (const room of floor.roomDetails) {
            if (selectedMaterials.includes("doors")) totalDoorArea += room.doorAreas.reduce((sum, area) => sum + area, 0);
            if (selectedMaterials.includes("windows")) totalWindowArea += room.windowAreas.reduce((sum, area) => sum + area, 0);
        }
    }

    if (selectedMaterials.includes("doors")) finishingMaterials.doors = totalDoorArea;
    if (selectedMaterials.includes("windows")) finishingMaterials.windows = totalWindowArea;

    // Calculate plumbing and electrical
    const totalRooms = floorDetails.reduce((sum, floor) => sum + floor.rooms, 0);
    if (selectedMaterials.includes("plumbing")) finishingMaterials.plumbing = totalRooms;
    if (selectedMaterials.includes("electrical")) finishingMaterials.electrical = totalRooms;

    // Calculate labor
    if (selectedMaterials.includes("labor")) {
        greyMaterials.labor = 0.6 * coveredArea;
        finishingMaterials.labor = 0.4 * coveredArea;
    }

    // Store materials for global access
    window.materials = { foundation: foundationMaterials, grey: greyMaterials, finishing: finishingMaterials, floorDetails };

    // Calculate costs
    let foundationCost = 0;
    let greyCost = 0;
    let finishingCost = 0;

    for (const material in foundationMaterials) {
        const quantity = foundationMaterials[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand;
        foundationCost += quantity * price;
    }

    for (const material in greyMaterials) {
        const quantity = greyMaterials[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand || materialRates[material].pricePerSqFt;
        greyCost += quantity * price;
    }

    for (const material in finishingMaterials) {
        const quantity = finishingMaterials[material];
        const price = materialRates[material].pricePerSqFt || materialRates[material].pricePerLiter || materialRates[material].pricePerUnit || materialRates[material].pricePerRoom;
        finishingCost += quantity * price;
    }

    const totalCost = foundationCost + greyCost + finishingCost;

    // Update floor details table
    const floorDetailsTable = document.getElementById("floorDetailsTable");
    floorDetailsTable.innerHTML = `
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-blue-600 text-white">
                    <th class="p-2 border">Floor</th>
                    <th class="p-2 border">Height (ft)</th>
                    <th class="p-2 border">Rooms</th>
                    ${selectedMaterials.includes("doors") ? '<th class="p-2 border">Door Areas per Room (sq ft)</th>' : ""}
                    ${selectedMaterials.includes("windows") ? '<th class="p-2 border">Window Areas per Room (sq ft)</th>' : ""}
                    <th class="p-2 border">Wall Width</th>
                    <th class="p-2 border">Type</th>
                </tr>
            </thead>
            <tbody>
                ${getFloorDetailsForTable()}
            </tbody>
        </table>
    `;

    // Update foundation materials table
    const foundationMaterialList = document.getElementById("foundationMaterialList");
    foundationMaterialList.innerHTML = `
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-blue-600 text-white">
                    <th class="p-2 border">Material</th>
                    <th class="p-2 border">Quantity</th>
                    <th class="p-2 border">Rate</th>
                    <th class="p-2 border">Total Cost</th>
                </tr>
            </thead>
            <tbody id="foundationMaterialTableBody"></tbody>
        </table>
    `;

    const foundationTableBody = document.getElementById("foundationMaterialTableBody");
    for (const material in foundationMaterials) {
        const quantity = foundationMaterials[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand;
        const cost = quantity * price;
        foundationTableBody.innerHTML += `
            <tr class="material-row">
                <td class="p-2 border">${material.charAt(0).toUpperCase() + material.slice(1)}</td>
                <td class="p-2 border">${formatNumber(quantity)} ${materialRates[material].unit}</td>
                <td class="p-2 border">
                    <input type="number" class="editable-rate" value="${price}" 
                           onchange="updateRate('foundation', '${material}', this.value, ${quantity})">
                </td>
                <td class="p-2 border total-cost-cell">${formatCurrency(cost)}</td>
            </tr>
        `;
    }

    // Update grey structure materials table
    const greyMaterialList = document.getElementById("greyMaterialList");
    greyMaterialList.innerHTML = `
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-blue-600 text-white">
                    <th class="p-2 border">Material</th>
                    <th class="p-2 border">Quantity</th>
                    <th class="p-2 border">Rate</th>
                    <th class="p-2 border">Total Cost</th>
                </tr>
            </thead>
            <tbody id="greyMaterialTableBody"></tbody>
        </table>
    `;

    const greyTableBody = document.getElementById("greyMaterialTableBody");
    for (const material in greyMaterials) {
        const quantity = greyMaterials[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand || materialRates[material].pricePerSqFt;
        const cost = quantity * price;
        greyTableBody.innerHTML += `
            <tr class="material-row">
                <td class="p-2 border">${material.charAt(0).toUpperCase() + material.slice(1)}</td>
                <td class="p-2 border">${formatNumber(quantity)} ${materialRates[material].unit}</td>
                <td class="p-2 border">
                    <input type="number" class="editable-rate" value="${price}" 
                           onchange="updateRate('grey', '${material}', this.value, ${quantity})">
                </td>
                <td class="p-2 border total-cost-cell">${formatCurrency(cost)}</td>
            </tr>
        `;
    }

    // Update finishing materials table
    const finishingMaterialList = document.getElementById("finishingMaterialList");
    finishingMaterialList.innerHTML = `
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-blue-600 text-white">
                    <th class="p-2 border">Material</th>
                    <th class="p-2 border">Quantity</th>
                    <th class="p-2 border">Rate</th>
                    <th class="p-2 border">Total Cost</th>
                </tr>
            </thead>
            <tbody id="finishMaterialTableBody"></tbody>
        </table>
    `;

    const finishingTableBody = document.getElementById("finishMaterialTableBody");
    for (const material in finishingMaterials) {
        const quantity = finishingMaterials[material];
        const price = materialRates[material].pricePerSqFt || materialRates[material].pricePerLiter || materialRates[material].pricePerUnit || materialRates[material].pricePerRoom;
        const cost = quantity * price;
        finishingTableBody.innerHTML += `
            <tr class="material-row">
                <td class="p-2 border">${material.charAt(0).toUpperCase() + material.slice(1)}</td>
                <td class="p-2 border">${formatNumber(quantity)} ${materialRates[material].unit}</td>
                <td class="p-2 border">
                    <input type="number" class="editable-rate" value="${price}" 
                           onchange="updateRate('finishing', '${material}', this.value, ${quantity})">
                </td>
                <td class="p-2 border total-cost-cell">${formatCurrency(cost)}</td>
            </tr>
        `;
    }

    // Update cost summaries
    document.getElementById("foundationCost").textContent = formatCurrency(foundationCost);
    document.getElementById("greyCost").textContent = formatCurrency(greyCost);
    document.getElementById("finishCost").textContent = formatCurrency(finishingCost);
    document.getElementById("totalCost").textContent = formatCurrency(totalCost);

    // Update project summary
    const projectSummary = document.getElementById("projectSummary");
    projectSummary.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
                <span class="text-gray-600">Plot Area:</span>
                <span>${formatNumber(plotArea)} ${areaUnit} (${formatNumber(plotAreaSqFt)} sq ft)</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Total Floors:</span>
                <span>${numFloors}${hasBasement ? " + Basement" : ""}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Total Rooms:</span>
                <span>${totalRooms}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Covered Area:</span>
                <span>${formatNumber(coveredArea)} sq ft</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Construction Type:</span>
                <span>${12 * floorDetails[0].wallWidth === 9 ? '9" Brick Walls' : '4.5" Brick Walls'}</span>
            </div>
        </div>
    `;

    // Show results and scroll to foundation materials
    document.getElementById("results").classList.remove("hidden");
    window.scrollTo({ top: document.getElementById("foundationMaterialList").offsetTop, behavior: "smooth" });
}

// Update material rates and recalculate costs
function updateRate(category, material, newRate, quantity) {
    newRate = parseFloat(newRate);

    // Update material rate in materialRates object
    if (material in materialRates) {
        if (materialRates[material].pricePerBag) materialRates[material].pricePerBag = newRate;
        else if (materialRates[material].pricePerCuFt) materialRates[material].pricePerCuFt = newRate;
        else if (materialRates[material].pricePerKg) materialRates[material].pricePerKg = newRate;
        else if (materialRates[material].pricePerThousand) materialRates[material].pricePerThousand = newRate;
        else if (materialRates[material].pricePerSqFt) materialRates[material].pricePerSqFt = newRate;
        else if (materialRates[material].pricePerLiter) materialRates[material].pricePerLiter = newRate;
        else if (materialRates[material].pricePerUnit) materialRates[material].pricePerUnit = newRate;
        else if (materialRates[material].pricePerRoom) materialRates[material].pricePerRoom = newRate;

        materialRates[material].rateDisplay = `PKR ${newRate.toLocaleString("en-PK")}/${materialRates[material].unit}`;
    }

    // Recalculate costs
    let foundationCost = 0;
    let greyCost = 0;
    let finishingCost = 0;
    const materials = window.materials;

    // Update foundation materials table
    const foundationTableBody = document.getElementById("foundationMaterialTableBody");
    foundationTableBody.innerHTML = "";
    for (const material in materials.foundation) {
        const quantity = materials.foundation[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand;
        const cost = quantity * price;
        foundationCost += cost;
        foundationTableBody.innerHTML += `
            <tr class="material-row">
                <td class="p-2 border">${material.charAt(0).toUpperCase() + material.slice(1)}</td>
                <td class="p-2 border">${formatNumber(quantity)} ${materialRates[material].unit}</td>
                <td class="p-2 border">
                    <input type="number" class="editable-rate" value="${price}" 
                           onchange="updateRate('foundation', '${material}', this.value, ${quantity})">
                </td>
                <td class="p-2 border total-cost-cell">${formatCurrency(cost)}</td>
            </tr>
        `;
    }

    // Update grey structure materials table
    const greyTableBody = document.getElementById("greyMaterialTableBody");
    greyTableBody.innerHTML = "";
    for (const material in materials.grey) {
        const quantity = materials.grey[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand || materialRates[material].pricePerSqFt;
        const cost = quantity * price;
        greyCost += cost;
        greyTableBody.innerHTML += `
            <tr class="material-row">
                <td class="p-2 border">${material.charAt(0).toUpperCase() + material.slice(1)}</td>
                <td class="p-2 border">${formatNumber(quantity)} ${materialRates[material].unit}</td>
                <td class="p-2 border">
                    <input type="number" class="editable-rate" value="${price}" 
                           onchange="updateRate('grey', '${material}', this.value, ${quantity})">
                </td>
                <td class="p-2 border total-cost-cell">${formatCurrency(cost)}</td>
            </tr>
        `;
    }

    // Update finishing materials table
    const finishingTableBody = document.getElementById("finishMaterialTableBody");
    finishingTableBody.innerHTML = "";
    for (const material in materials.finishing) {
        const quantity = materials.finishing[material];
        const price = materialRates[material].pricePerSqFt || materialRates[material].pricePerLiter || materialRates[material].pricePerUnit || materialRates[material].pricePerRoom;
        const cost = quantity * price;
        finishingCost += cost;
        finishingTableBody.innerHTML += `
            <tr class="material-row">
                <td class="p-2 border">${material.charAt(0).toUpperCase() + material.slice(1)}</td>
                <td class="p-2 border">${formatNumber(quantity)} ${materialRates[material].unit}</td>
                <td class="p-2 border">
                    <input type="number" class="editable-rate" value="${price}" 
                           onchange="updateRate('finishing', '${material}', this.value, ${quantity})">
                </td>
                <td class="p-2 border total-cost-cell">${formatCurrency(cost)}</td>
            </tr>
        `;
    }

    // Update cost summaries
    document.getElementById("foundationCost").textContent = formatCurrency(foundationCost);
    document.getElementById("greyCost").textContent = formatCurrency(greyCost);
    document.getElementById("finishCost").textContent = formatCurrency(finishingCost);
    document.getElementById("totalCost").textContent = formatCurrency(foundationCost + greyCost + finishingCost);
}

// Generate floor details table rows for display
function getFloorDetailsForTable() {
    const numFloors = parseInt(document.getElementById("numFloors").value);
    const hasBasement = document.getElementById("hasBasement").value === "yes";
    const selectedMaterials = Object.keys(materialRates).filter(material => document.getElementById(`material_${material}`).checked);
    let tableRows = "";

    for (let i = hasBasement ? -1 : 0; i < numFloors; i++) {
        const floorName = i === -1 ? "Basement" : `Floor ${i + 1}`;
        const height = parseFloat(document.getElementById(`heightFloor${i}`).value);
        const rooms = parseInt(document.getElementById(`roomsFloor${i}`).value) || 0;
        const wallWidth = document.getElementById(`wallWidthFloor${i}`).value;
        const isRoof = i === numFloors - 1 && document.getElementById(`isRoofFloor${i}`)?.value === "yes";
        const doorAreasPerRoom = [];
        const windowAreasPerRoom = [];

        for (let room = 1; room <= rooms; room++) {
            const numDoors = document.getElementById(`numDoorsRoom${room}Floor${i}`)?.value || 0;
            const numWindows = document.getElementById(`numWindowsRoom${room}Floor${i}`)?.value || 0;
            const doorAreas = [];
            const windowAreas = [];

            for (let door = 1; door <= numDoors; door++) {
                const doorHeight = document.getElementById(`doorHeightRoom${room}Floor${i}Door${door}`)?.value || 0;
                const doorWidth = document.getElementById(`doorWidthRoom${room}Floor${i}Door${door}`)?.value || 0;
                const doorArea = parseFloat(doorHeight) * parseFloat(doorWidth);
                doorAreas.push(formatNumber(doorArea, 1));
            }

            for (let window = 1; window <= numWindows; window++) {
                const windowHeight = document.getElementById(`windowHeightRoom${room}Floor${i}Window${window}`)?.value || 0;
                const windowWidth = document.getElementById(`windowWidthRoom${room}Floor${i}Window${window}`)?.value || 0;
                const windowArea = parseFloat(windowHeight) * parseFloat(windowWidth);
                windowAreas.push(formatNumber(windowArea, 1));
            }

            doorAreasPerRoom.push(`[${doorAreas.join(", ")}]`);
            windowAreasPerRoom.push(`[${windowAreas.join(", ")}]`);
        }

        tableRows += `
            <tr>
                <td class="p-2 border">${floorName}</td>
                <td class="p-2 border">${formatNumber(height, 1)} ft</td>
                <td class="p-2 border">${rooms}</td>
                ${selectedMaterials.includes("doors") ? `<td class="p-2 border text-center">${doorAreasPerRoom.join(", ")}</td>` : ""}
                ${selectedMaterials.includes("windows") ? `<td class="p-2 border text-center">${windowAreasPerRoom.join(", ")}</td>` : ""}
                <td class="p-2 border">${wallWidth}"</td>
                <td class="p-2 border">${isRoof ? "Roof" : "Regular"}</td>
            </tr>
        `;
    }

    return tableRows;
}

// Export the estimate to a PDF using jsPDF
async function exportToPDF() {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set document title
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text("Construction Cost Estimate (Pakistan)", 105, 20, { align: "center" });

    // Add project summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const plotArea = parseFloat(document.getElementById("plotArea").value);
    const areaUnit = document.getElementById("areaUnit").value;
    const plotAreaSqFt = plotArea * areaConversions[areaUnit];
    doc.text(`Plot Area: ${formatNumber(plotArea)} ${areaUnit} (${formatNumber(plotAreaSqFt)} sq ft)`, 14, 30);
    doc.text(`Floors: ${document.getElementById("numFloors").value}${document.getElementById("hasBasement").value === "yes" ? " + Basement" : ""}`, 14, 36);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);

    // Add floor details table
    doc.setFontSize(14);
    doc.text("Floor Details:", 14, 52);
    const floorTableColumns = ["Floor", "Height (ft)", "Rooms"];
    const selectedMaterials = Object.keys(materialRates).filter(material => document.getElementById(`material_${material}`).checked);
    if (selectedMaterials.includes("doors")) floorTableColumns.push("Door Areas per Room (sq ft)");
    if (selectedMaterials.includes("windows")) floorTableColumns.push("Window Areas per Room (sq ft)");
    floorTableColumns.push("Wall Width", "Type");

    doc.autoTable({
        startY: 56,
        head: [floorTableColumns],
        body: getFloorDetailsForPDF(),
        theme: "grid",
        headStyles: { fillColor: [40, 53, 147], textColor: 255 },
        styles: { fontSize: 10 },
        columnStyles: {
            3: selectedMaterials.includes("doors") ? { halign: "center" } : null,
            4: selectedMaterials.includes("windows") ? { halign: "center" } : null,
        },
    });

    // Add foundation materials table
    doc.setFontSize(14);
    doc.text("Foundation Materials:", 14, doc.autoTable.previous.finalY + 10);
    const foundationTableData = [];
    for (const material in window.materials.foundation) {
        const quantity = window.materials.foundation[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand;
        const cost = quantity * price;
        foundationTableData.push([
            material.charAt(0).toUpperCase() + material.slice(1),
            formatNumber(quantity) + " " + materialRates[material].unit,
            materialRates[material].rateDisplay,
            formatCurrency(cost),
        ]);
    }

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [["Material", "Quantity", "Rate", "Total Cost"]],
        body: foundationTableData,
        theme: "grid",
        headStyles: { fillColor: [40, 53, 147], textColor: 255 },
        columnStyles: { 3: { halign: "right", fontStyle: "bold" } },
        styles: { fontSize: 9 },
    });

    // Add grey structure materials table
    doc.setFontSize(14);
    doc.text("Grey Structure Materials:", 14, doc.autoTable.previous.finalY + 10);
    const greyTableData = [];
    for (const material in window.materials.grey) {
        const quantity = window.materials.grey[material];
        const price = materialRates[material].pricePerBag || materialRates[material].pricePerCuFt || materialRates[material].pricePerKg || materialRates[material].pricePerThousand || materialRates[material].pricePerSqFt;
        const cost = quantity * price;
        greyTableData.push([
            material.charAt(0).toUpperCase() + material.slice(1),
            formatNumber(quantity) + " " + materialRates[material].unit,
            materialRates[material].rateDisplay,
            formatCurrency(cost),
        ]);
    }

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [["Material", "Quantity", "Rate", "Total Cost"]],
        body: greyTableData,
        theme: "grid",
        headStyles: { fillColor: [40, 53, 147], textColor: 255 },
        columnStyles: { 3: { halign: "right", fontStyle: "bold" } },
        styles: { fontSize: 9 },
    });

    // Add finishing materials table
    doc.setFontSize(14);
    doc.text("Finishing Materials:", 14, doc.autoTable.previous.finalY + 10);
    const finishingTableData = [];
    for (const material in window.materials.finishing) {
        const quantity = window.materials.finishing[material];
        const price = materialRates[material].pricePerSqFt || materialRates[material].pricePerLiter || materialRates[material].pricePerUnit || materialRates[material].pricePerRoom;
        const cost = quantity * price;
        finishingTableData.push([
            material.charAt(0).toUpperCase() + material.slice(1),
            formatNumber(quantity) + " " + materialRates[material].unit,
            materialRates[material].rateDisplay,
            formatCurrency(cost),
        ]);
    }

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [["Material", "Quantity", "Rate", "Total Cost"]],
        body: finishingTableData,
        theme: "grid",
        headStyles: { fillColor: [40, 53, 147], textColor: 255 },
        columnStyles: { 3: { halign: "right", fontStyle: "bold" } },
        styles: { fontSize: 9 },
    });

    // Add cost summary
    doc.setFontSize(14);
    doc.text("Cost Summary:", 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        body: [
            ["Foundation Cost", document.getElementById("foundationCost").textContent],
            ["Grey Structure Cost", document.getElementById("greyCost").textContent],
            ["Finishing Cost", document.getElementById("finishCost").textContent],
            ["Total Estimated Cost", document.getElementById("totalCost").textContent],
        ],
        theme: "grid",
        columnStyles: { 1: { halign: "right", fontStyle: "bold" } },
        styles: { fontSize: 12, cellPadding: 5 },
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Generated by Construction Cost Estimator", 105, 285, { align: "center" });

    // Save the PDF
    doc.save("Construction_Estimate.pdf");
}

// Generate floor details for PDF export
function getFloorDetailsForPDF() {
    const numFloors = parseInt(document.getElementById("numFloors").value);
    const hasBasement = document.getElementById("hasBasement").value === "yes";
    const selectedMaterials = Object.keys(materialRates).filter(material => document.getElementById(`material_${material}`).checked);
    const tableData = [];

    for (let i = hasBasement ? -1 : 0; i < numFloors; i++) {
        const floorName = i === -1 ? "Basement" : `Floor ${i + 1}`;
        const height = document.getElementById(`heightFloor${i}`)?.value;
        const rooms = parseInt(document.getElementById(`roomsFloor${i}`)?.value) || 0;
        const wallWidth = document.getElementById(`wallWidthFloor${i}`)?.value;
        const isRoof = i === numFloors - 1 && document.getElementById(`isRoofFloor${i}`)?.value === "yes";
        const doorAreasPerRoom = [];
        const windowAreasPerRoom = [];

        for (let room = 1; room <= rooms; room++) {
            const numDoors = document.getElementById(`numDoorsRoom${room}Floor${i}`)?.value || 0;
            const numWindows = document.getElementById(`numWindowsRoom${room}Floor${i}`)?.value || 0;
            const doorAreas = [];
            const windowAreas = [];

            for (let door = 1; door <= numDoors; door++) {
                const doorHeight = document.getElementById(`doorHeightRoom${room}Floor${i}Door${door}`)?.value || 0;
                const doorWidth = document.getElementById(`doorWidthRoom${room}Floor${i}Door${door}`)?.value || 0;
                const doorArea = parseFloat(doorHeight) * parseFloat(doorWidth);
                doorAreas.push(formatNumber(doorArea, 1));
            }

            for (let window = 1; window <= numWindows; window++) {
                const windowHeight = document.getElementById(`windowHeightRoom${room}Floor${i}Window${window}`)?.value || 0;
                const windowWidth = document.getElementById(`windowWidthRoom${room}Floor${i}Window${window}`)?.value || 0;
                const windowArea = parseFloat(windowHeight) * parseFloat(windowWidth);
                windowAreas.push(formatNumber(windowArea, 1));
            }

            doorAreasPerRoom.push(`[${doorAreas.join(", ")}]`);
            windowAreasPerRoom.push(`[${windowAreas.join(", ")}]`);
        }

        const row = [floorName, height + " ft", rooms];
        if (selectedMaterials.includes("doors")) row.push(doorAreasPerRoom.join(", "));
        if (selectedMaterials.includes("windows")) row.push(windowAreasPerRoom.join(", "));
        row.push(wallWidth + '"', isRoof ? "Roof" : "Regular");
        tableData.push(row);
    }

    return tableData;
}

// Initialize event listeners and material selection
document.getElementById("numFloors").addEventListener("input", () => {
    showMaterialAndFloorDetails();
    updateFloorInputs();
});

document.getElementById("hasBasement").addEventListener("change", () => {
    showMaterialAndFloorDetails();
    updateFloorInputs();
});

initMaterialSelection();