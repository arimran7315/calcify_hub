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
document.addEventListener("DOMContentLoaded", function () {
    const generatePdfButton = document.getElementById("generate-pdf-report");
    const generatingPdfIndicator = document.getElementById("generatingPdf");
    const calculateButton = document.getElementById("calculate-btn");
    const calculatingIndicator = document.getElementById("calculatingBtn");
    const resetButton = document.getElementById("reset-btn");
    const resettingIndicator = document.getElementById("resetingBtn");

    function calculateSolarRequirements(scrollToResults = false) {
        const selectedAppliances = document.querySelectorAll(".appliance-checkbox:checked");

        if (selectedAppliances.length === 0) {
            alert("Kindly select an appliance from the list");
            return;
        }

        let totalWattage = 0;
        let maxSingleWattage = 0;
        let isValidInput = true;
        selectedAppliances.forEach((checkbox) => {
            if (checkbox.checked) {
                const wattageInput = checkbox.parentElement.parentElement.querySelector(".wattage");
                const quantityInput = checkbox.parentElement.parentElement.querySelector(".quantity");
                const wattage = parseFloat(wattageInput.value) || 0;
                const quantity = parseFloat(quantityInput.value) || 0;

                if (wattage <= 0 || quantity <= 0) {
                    isValidInput = false;
                } else {
                    totalWattage += wattage * quantity;
                    maxSingleWattage = Math.max(maxSingleWattage, wattage);
                }
            }
        });

        if (!isValidInput) {
            alert("Please enter valid wattage and quantity for at least one checked appliance");
            return;
        }
        const panelPriceInput = document.getElementById("panel-price");
        if (!panelPriceInput.value || panelPriceInput.value === "") {
            alert("Please Enter Price Of Panel Per Watt");
            return;
        }

        generatePdfButton.classList.remove("hidden");
        calculateButton.classList.add("hidden");

        const bufferedWattage = Math.ceil(1.2 * totalWattage);
        const inverterSize = bufferedWattage <= 3000 ? 3000 : bufferedWattage <= 5000 ? 5000 : 10000;
        const inverterCost = 25 * inverterSize;

        document.getElementById("require-watts").textContent = `${totalWattage.toLocaleString()} W`;
        document.getElementById("Buffer-watts").textContent = `${(bufferedWattage - totalWattage).toLocaleString()} W`;
        document.getElementById("total-watts").textContent = `${bufferedWattage.toLocaleString()} W`;
        document.getElementById("inverter-size").textContent = `${inverterSize <= 3000 ? "3" : inverterSize <= 5000 ? "5" : "10"} KW`;
        document.getElementById("inverter-cost").textContent = `₨. ${inverterCost.toLocaleString()}`;

        const panelPricePerWatt = parseFloat(panelPriceInput.value);
        const smallPanelCount = Math.ceil(bufferedWattage / 150);
        const mediumPanelCount = Math.ceil(bufferedWattage / 350);
        const largePanelCount = Math.ceil(bufferedWattage / 550);

        const smallPanelUnitCost = 150 * panelPricePerWatt;
        const mediumPanelUnitCost = 350 * panelPricePerWatt;
        const largePanelUnitCost = 585 * panelPricePerWatt;

        const smallPanelTotalCost = smallPanelCount * smallPanelUnitCost;
        const mediumPanelTotalCost = mediumPanelCount * mediumPanelUnitCost;
        const largePanelTotalCost = largePanelCount * largePanelUnitCost;

        document.getElementById("singleSmallPanelCost").textContent = `Rs. ${smallPanelUnitCost.toLocaleString()}`;
        document.getElementById("singleMediumPanelCost").textContent = `Rs. ${mediumPanelUnitCost.toLocaleString()}`;
        document.getElementById("singleLargePanelCost").textContent = `Rs. ${Math.round(largePanelUnitCost).toLocaleString()}`;
        document.getElementById("small-panels").textContent = `${smallPanelCount} Panels Needed`;
        document.getElementById("medium-panels").textContent = `${mediumPanelCount} Panels Needed`;
        document.getElementById("large-panels").textContent = `${largePanelCount} Panels Needed`;
        document.getElementById("small-panels-cost").textContent = `Rs. ${smallPanelTotalCost.toLocaleString()}`;
        document.getElementById("medium-panels-cost").textContent = `Rs. ${mediumPanelTotalCost.toLocaleString()}`;
        document.getElementById("large-panels-cost").textContent = `Rs. ${largePanelTotalCost.toLocaleString()}`;
        document.getElementById("installation-cost").textContent = `Rs. ${'30000'.toLocaleString()}`;
        document.getElementById("installation-cost-medium").textContent = `Rs. ${'30000'.toLocaleString()}`;
        document.getElementById("installation-cost-large").textContent = `Rs. ${'30000'.toLocaleString()}`;
        document.getElementById("small-total-cost").textContent = `Rs. ${(smallPanelTotalCost + inverterCost + 30000).toLocaleString()}`;
        document.getElementById("medium-total-cost").textContent = `Rs. ${(mediumPanelTotalCost + inverterCost + 30000).toLocaleString()}`;
        document.getElementById("large-total-cost").textContent = `Rs. ${(largePanelTotalCost + inverterCost + 30000).toLocaleString()}`;
        document.getElementById("small-panels-power-generates").textContent = `${(150 * smallPanelCount).toLocaleString()} W`;
        document.getElementById("medium-panels-power-generates").textContent = `${(350 * mediumPanelCount).toLocaleString()} W`;
        document.getElementById("large-panels-power-generates").textContent = `${(550 * largePanelCount).toLocaleString()} W`;

        ["inverter-cost-small", "inverter-cost-medium", "inverter-cost-large"].forEach((id) => {
            document.getElementById(id).textContent = `Rs. ${inverterCost.toLocaleString()}`;
        });

        const resultsSection = document.getElementById("results");
        resultsSection.classList.remove("hidden");

        if (scrollToResults && resultsSection) {
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    document.getElementById("panel-price").addEventListener("keyup", function () {
        if (!document.getElementById("results").classList.contains("hidden")) {
            calculateSolarRequirements();
        }
    });

    document.querySelectorAll(".appliance-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const numberInputs = this.parentElement.parentElement.querySelectorAll('input[type="number"]');
            numberInputs.forEach((input) => {
                if (this.checked) {
                    input.classList.remove("hidden");
                    input.disabled = false;
                } else {
                    input.classList.add("hidden");
                    input.disabled = true;
                    input.value = "";
                }
            });
        });
    });

    calculateButton.addEventListener("click", () => {
        calculateButton.classList.add("hidden");
        calculatingIndicator.classList.remove("hidden");
        setTimeout(() => {
            calculateSolarRequirements(true);
            calculateButton.classList.remove("hidden");
            calculatingIndicator.classList.add("hidden");
        }, 500);
    });

    resetButton.addEventListener("click", () => {
        resetButton.classList.add("hidden");
        resettingIndicator.classList.remove("hidden");
        setTimeout(() => {
            generatePdfButton.classList.add("hidden");
            calculateButton.classList.remove("hidden");

            document.querySelectorAll(".appliance-checkbox").forEach((checkbox) => {
                checkbox.checked = false;
                const numberInputs = checkbox.parentElement.parentElement.querySelectorAll('input[type="number"]');
                numberInputs.forEach((input) => {
                    input.classList.add("hidden");
                    input.disabled = true;
                    input.value = "";
                });
            });

            const panelPriceInput = document.getElementById("panel-price");
            panelPriceInput.value = "";
            panelPriceInput.placeholder = "Enter amount";

            document.getElementById("singleSmallPanelCost").textContent = "Rs. 0";
            document.getElementById("singleMediumPanelCost").textContent = "Rs. 0";
            document.getElementById("singleLargePanelCost").textContent = "Rs. 0";
            document.getElementById("results").classList.add("hidden");
            document.getElementById("require-watts").textContent = "0 W";
            document.getElementById("Buffer-watts").textContent = "0 W";
            document.getElementById("total-watts").textContent = "0 W";
            document.getElementById("inverter-size").textContent = "0 KW";
            document.getElementById("inverter-cost").textContent = "₨0";
            document.getElementById("small-panels").textContent = "0";
            document.getElementById("medium-panels").textContent = "0";
            document.getElementById("large-panels").textContent = "0";
            document.getElementById("small-panels-cost").textContent = "Rs. 0";
            document.getElementById("medium-panels-cost").textContent = "Rs. 0";
            document.getElementById("large-panels-cost").textContent = "Rs. 0";
            document.getElementById("installation-cost").textContent = "Rs. 30,000";
            document.getElementById("installation-cost-medium").textContent = "Rs. 30,000";
            document.getElementById("installation-cost-large").textContent = "Rs. 30,000";
            document.getElementById("small-total-cost").textContent = "Rs. 0";
            document.getElementById("medium-total-cost").textContent = "Rs. 0";
            document.getElementById("large-total-cost").textContent = "Rs. 0";
            document.getElementById("small-panels-power-generates").textContent = "0 W";
            document.getElementById("medium-panels-power-generates").textContent = "0 W";
            document.getElementById("large-panels-power-generates").textContent = "0 W";

            resetButton.classList.remove("hidden");
            resettingIndicator.classList.add("hidden");
        }, 500);
    });

    generatePdfButton.addEventListener("click", async () => {
        try {
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");
            generatePdf();
        } catch (err) {
            alert("Failed to load PDF libraries: " + err.message);
            console.error(err);
        } finally {
            generatePdfButton.classList.remove("hidden");
            generatingPdfIndicator.classList.add("hidden");
        }
        // setTimeout(() => {
        //     generatePdf();
        //     generatePdfButton.classList.remove("hidden");
        //     generatingPdfIndicator.classList.add("hidden");
        // }, 500);
    });

    function generatePdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setProperties({
            title: "Solar Power Usage Report - Pakistan",
            subject: "Solar Power Calculation",
            author: "Solar Calculator",
            keywords: "solar, pakistan, calculator, energy",
            creator: "Solar Calculator Tool"
        });

        doc.setFontSize(16);
        doc.setTextColor(40, 53, 147);
        doc.text("Solar Power Usage Report (Pakistan)", 105, 10, { align: "center" });
        doc.setFontSize(12);
        doc.text("Detailed Solar System Calculation", 105, 17, { align: "center" });
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Daytime Operation Only - No Battery Included", 105, 24, { align: "center" });

        const currentDate = new Date();
        doc.text(`Generated on: ${currentDate.toLocaleDateString()} at ${currentDate.toLocaleTimeString()}`, 15, 30);

        let yPosition = 40;

        function checkPageBreak(currentY, spaceNeeded) {
            if (currentY + spaceNeeded > 287) {
                doc.addPage();
                return 10;
            }
            return currentY;
        }

        doc.setFontSize(12);
        doc.setTextColor(40, 53, 147);
        doc.text("Selected Appliances:", 15, yPosition);

        const appliances = [];
        document.querySelectorAll(".appliance-checkbox:checked").forEach((checkbox) => {
            const name = checkbox.parentElement.textContent.trim();
            const wattageInput = checkbox.parentElement.parentElement.querySelector(".wattage");
            const quantityInput = checkbox.parentElement.parentElement.querySelector(".quantity");
            const wattage = parseFloat(wattageInput.value) || 0;
            const quantity = parseFloat(quantityInput.value) || 0;

            if (wattage > 0 && quantity > 0) {
                appliances.push({
                    name,
                    watts: wattage,
                    quantity,
                    total: wattage * quantity
                });
            }
        });

        yPosition = checkPageBreak(yPosition + 5, 50);

        if (appliances.length > 0) {
            doc.autoTable({
                startY: yPosition + 5,
                head: [["Appliance", "Watts", "Qty", "Total Watts"]],
                body: appliances.map(item => [item.name, item.watts + " W", item.quantity, item.total + " W"]),
                headStyles: { fillColor: [40, 53, 147], textColor: [255, 255, 255], fontStyle: "bold" },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                margin: { left: 15, right: 15 },
                tableWidth: 180
            });
            yPosition = doc.lastAutoTable.finalY;
        } else {
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text("No appliances selected", 20, yPosition + 10);
            yPosition += 15;
        }

        yPosition = checkPageBreak(yPosition + 15, 30);
        doc.setFontSize(12);
        doc.setTextColor(40, 53, 147);
        doc.text("Panel Price Information:", 15, yPosition + 15);

        const panelPrice = parseFloat(document.getElementById("panel-price").value) || 0;
        const priceTable = [["Panel Price Per Watt (According Market)", `Rs. ${panelPrice.toLocaleString()}`]];

        doc.autoTable({
            startY: yPosition + 20,
            body: priceTable,
            styles: { cellPadding: 5, fontSize: 10, textColor: [50, 50, 50] },
            columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 }, 1: { cellWidth: 20 } },
            margin: { left: 15, right: 15 },
            tableWidth: 180
        });
        yPosition = doc.lastAutoTable.finalY;

        yPosition = checkPageBreak(yPosition + 15, 50);
        doc.setFontSize(12);
        doc.setTextColor(40, 53, 147);
        doc.text("Power Requirements:", 15, yPosition + 15);

        const powerTable = [
            ["Power Requirement", document.getElementById("require-watts").textContent],
            ["20% Buffer Added", document.getElementById("Buffer-watts").textContent],
            ["Total Power Needed", document.getElementById("total-watts").textContent]
        ];

        doc.autoTable({
            startY: yPosition + 20,
            body: powerTable,
            styles: { cellPadding: 5, fontSize: 10, textColor: [50, 50, 50] },
            columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 }, 1: { cellWidth: 40 } },
            margin: { left: 15, right: 15 },
            tableWidth: 180
        });
        yPosition = doc.lastAutoTable.finalY;

        yPosition = checkPageBreak(yPosition + 15, 40);
        doc.setFontSize(12);
        doc.setTextColor(40, 53, 147);
        doc.text("Inverter Requirements:", 15, yPosition + 15);

        const inverterTable = [
            ["Required Inverter", document.getElementById("inverter-size").textContent],
            ["Estimated Cost", document.getElementById("inverter-cost-small").textContent]
        ];

        doc.autoTable({
            startY: yPosition + 20,
            body: inverterTable,
            styles: { cellPadding: 5, fontSize: 10, textColor: [50, 50, 50] },
            columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 }, 1: { cellWidth: 40 } },
            margin: { left: 15, right: 15 },
            tableWidth: 180
        });
        yPosition = doc.lastAutoTable.finalY;

        yPosition = checkPageBreak(yPosition + 15, 60);
        doc.setFontSize(12);
        doc.setTextColor(40, 53, 147);
        doc.text("Solar Panel Options:", 15, yPosition + 15);

        const panelOptions = [
            {
                type: document.querySelector("tr:nth-child(1) td:first-child")?.textContent || "Small Panel",
                power: document.querySelector("tr:nth-child(1) td:nth-child(2)")?.textContent || "150 W",
                singleCost: document.getElementById("singleSmallPanelCost").textContent,
                quantity: document.getElementById("small-panels").textContent,
                powerGen: document.getElementById("small-panels-power-generates").textContent,
                cost: document.getElementById("small-panels-cost").textContent,
                inverterCost: document.getElementById("inverter-cost-small").textContent,
                install: document.getElementById("installation-cost").textContent,
                total: document.getElementById("small-total-cost").textContent
            },
            {
                type: document.querySelector("tr:nth-child(2) td:first-child")?.textContent || "Medium Panel",
                power: document.querySelector("tr:nth-child(2) td:nth-child(2)")?.textContent || "350 W",
                singleCost: document.getElementById("singleMediumPanelCost").textContent,
                quantity: document.getElementById("medium-panels").textContent,
                powerGen: document.getElementById("medium-panels-power-generates").textContent,
                cost: document.getElementById("medium-panels-cost").textContent,
                inverterCost: document.getElementById("inverter-cost-medium").textContent,
                install: document.getElementById("installation-cost-medium").textContent,
                total: document.getElementById("medium-total-cost").textContent
            },
            {
                type: document.querySelector("tr:nth-child(3) td:first-child")?.textContent || "Large Panel",
                power: document.querySelector("tr:nth-child(3) td:nth-child(2)")?.textContent || "550 W",
                singleCost: document.getElementById("singleLargePanelCost").textContent,
                quantity: document.getElementById("large-panels").textContent,
                powerGen: document.getElementById("large-panels-power-generates").textContent,
                cost: document.getElementById("large-panels-cost").textContent,
                inverterCost: document.getElementById("inverter-cost-large").textContent,
                install: document.getElementById("installation-cost-large").textContent,
                total: document.getElementById("large-total-cost").textContent
            }
        ];

        doc.autoTable({
            startY: yPosition + 20,
            head: [["Type", "Power", "Single Panel Cost", "Quantity Needed", "Power Gen", "Panel Cost", "Inverter Cost", "Install", "Total"]],
            body: panelOptions.map(option => [
                option.type,
                option.power,
                option.singleCost,
                option.quantity,
                option.powerGen,
                option.cost,
                option.inverterCost,
                option.install,
                option.total
            ]),
            headStyles: { fillColor: [40, 53, 147], textColor: [255, 255, 255], fontStyle: "bold" },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            styles: { fontSize: 7, cellPadding: 2, overflow: "linebreak" },
            margin: { left: 15, right: 15 },
            tableWidth: 180
        });
        yPosition = doc.lastAutoTable.finalY;

        yPosition = checkPageBreak(yPosition + 15, 30);
        doc.setFontSize(9);
        doc.setTextColor(100);
        const notes = [
            "Notes:",
            "1. All calculations are for daytime operation only (no battery storage included)",
            "2. Prices are estimates based on current market rates in Pakistan",
            "3. Actual requirements may vary based on installation conditions",
            "4. Solar panel calculations include 20% buffer for system losses"
        ];
        notes.forEach((note, index) => {
            doc.text(note, 15, yPosition + 15 + 5 * index);
        });
        yPosition += 30;

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text("Solar Generate", 105, 285, { align: "center" });
            doc.setFontSize(8);
            doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: "right" });
        }
        const date = new Date();
        doc.save(`Solar_Report_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}.pdf`);
    }
});