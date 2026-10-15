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
  let useSection = document.getElementById("use"),
    calculatingBtn = document.getElementById("calculatingBtn"),
    resetingBtn = document.getElementById("resetingBtn");

  let inverterCosts = {
    3000: 30000,
    5000: 60000,
    10000: 110000
  };

  let appliances = [
    { name: 'LED Bulb', watts: 10, maxQty: 10 },
    { name: 'Tube Light', watts: 20, maxQty: 5 },
    { name: 'Ceiling Fan', watts: 75, maxQty: 3 },
    { name: 'Laptop', watts: 60, maxQty: 2 },
    { name: 'Refrigerator', watts: 70, maxQty: 1 },
    { name: 'TV', watts: 100, maxQty: 1 },
    { name: 'Washing Machine', watts: 500, maxQty: 1 },
    { name: 'Water Pump', watts: 750, maxQty: 1 },
    { name: 'Microwave', watts: 1000, maxQty: 1 },
    { name: 'Iron', watts: 1000, maxQty: 1 },
    { name: 'Electric Kettle', watts: 1200, maxQty: 1 },
    { name: 'AC', watts: 1500, maxQty: 1 }
  ];

  let panelTypes = [
    { type: "small", watts: 150, cost: 7500 },
    { type: "medium", watts: 350, cost: 16000 },
    { type: "large", watts: 550, cost: 22000 }
  ];

  function getRecommendedAppliances(powerNeeded) {
    let remaining = powerNeeded;
    let result = Array(appliances.length).fill(0);

    // Prioritize high-watt appliances first
    for (let i = appliances.length - 1; i >= 0; i--) {
      if (appliances[i].watts >= 750 && remaining >= appliances[i].watts) {
        let qty = Math.min(Math.floor(remaining / appliances[i].watts), appliances[i].maxQty);
        result[i] = qty;
        remaining -= qty * appliances[i].watts;
      }
    }

    // Fill with lower wattage appliances
    for (let i = 0; i < appliances.length; i++) {
      if (appliances[i].watts < 750) {
        let qty = Math.min(Math.floor(remaining / appliances[i].watts), appliances[i].maxQty);
        result[i] = qty;
        remaining -= qty * appliances[i].watts;
      }
    }

    return result;
  }

  document.getElementById("calculate-btn").addEventListener("click", function () {
    let budget = parseFloat(document.getElementById("budget-amount").value);

    calculatingBtn.classList.remove("hidden");
    document.getElementById("calculate-btn").classList.add("hidden");

    setTimeout(() => {
      if (isNaN(budget)) {
        calculatingBtn.classList.add("hidden");
        document.getElementById("calculate-btn").classList.remove("hidden");
        alert("Please enter a valid budget amount.");
        return;
      }

      if (budget < 150000) {
        calculatingBtn.classList.add("hidden");
        document.getElementById("calculate-btn").classList.remove("hidden");
        alert(`Budget must be at least ₨${'150000'.toLocaleString()}.`);
        return;
      }

      // Update panel cost from inputs
      document.querySelectorAll(".panel-price").forEach(input => {
        let type = input.dataset.type;
        let cost = parseFloat(input.value) || 0;
        let panel = panelTypes.find(p => p.type === type);
        if (panel) panel.cost = cost;
      });

      panelTypes.forEach(panel => {
        let calculation = (function calculateForType(budget, panel) {
          let panelCount = 0;
          let panelCost = 0;
          let generatedPower = 0;
          let inverterSize = 0;
          let inverterCost = 0;
          let installationCost = 30000;
          let totalCost = 0;

          while (true) {
            let nextCount = panelCount + 1;
            let nextPanelCost = nextCount * panel.cost;
            generatedPower = Math.floor((nextCount * panel.watts) / 1.3);
            inverterSize = Math.ceil(1.25 * generatedPower);

            let inverterCap = inverterSize > 5000 ? 10000 : inverterSize > 3000 ? 5000 : 3000;
            inverterCost = inverterCosts[inverterCap];
            totalCost = nextPanelCost + inverterCost + installationCost;

            if (totalCost > budget || nextCount < 0) {
              panelCost = panelCount * panel.cost;
              generatedPower = Math.floor((panelCount * panel.watts) / 1.3);
              inverterSize = Math.ceil(1.25 * generatedPower);
              inverterCap = inverterSize > 5000 ? 10000 : inverterSize > 3000 ? 5000 : 3000;
              inverterCost = inverterCosts[inverterCap];
              totalCost = panelCost + inverterCost + installationCost;
              break;
            }

            panelCount = nextCount;
          }

          return {
            maxPanels: panelCount,
            panelCost: panelCost,
            powerGenerated: generatedPower,
            inverterSize: inverterSize,
            inverterCost: inverterCost,
            installationCost: installationCost,
            totalCost: totalCost
          };
        })(budget, panel);

        (function updateDOM(panel, calculation) {
          document.getElementById(`${panel.type}-panels`).textContent = calculation.maxPanels + " Panels";
          document.getElementById(`${panel.type}-panels-cost`).textContent = "Rs. " + calculation.panelCost.toLocaleString();
          let totalPanelWatts = calculation.maxPanels * panel.watts;
          document.getElementById(`${panel.type}-power`).textContent = `${totalPanelWatts.toLocaleString()} W - ${Math.floor(0.3 * totalPanelWatts).toLocaleString()} W (30%) = ${calculation.powerGenerated.toLocaleString()} W`;
          document.getElementById(`${panel.type}-inverter-size`).textContent =
            calculation.inverterSize <= 3000 ? "3 KW" :
              calculation.inverterSize <= 5000 ? "5 KW" : "10 KW";
          document.getElementById(`${panel.type}-inverter-cost`).textContent = "Rs. " + calculation.inverterCost.toLocaleString();
          document.getElementById(`${panel.type}-installation-cost`).textContent = "Rs. " + calculation.installationCost.toLocaleString();
          document.getElementById(`${panel.type}-total-cost`).textContent = "Rs. " + calculation.totalCost.toLocaleString();
        })(panel, calculation);
      });

      // Appliance Recommendations
      (function updateApplianceTable() {
        let table = document.getElementById("appliance-table");
        table.innerHTML = "";

        let panelOutputs = [
          { type: "small", power: parseFloat(document.getElementById("small-power").textContent.split("=")[1].replace(/,/g, "").trim()) || 0 },
          { type: "medium", power: parseFloat(document.getElementById("medium-power").textContent.split("=")[1].replace(/,/g, "").trim()) || 0 },
          { type: "large", power: parseFloat(document.getElementById("large-power").textContent.split("=")[1].replace(/,/g, "").trim()) || 0 }
        ];

        appliances.forEach((appliance, index) => {
          let row = document.createElement("tr");
          let smallQty = getRecommendedAppliances(panelOutputs.find(p => p.type === "small").power)[index];
          let mediumQty = getRecommendedAppliances(panelOutputs.find(p => p.type === "medium").power)[index];
          let largeQty = getRecommendedAppliances(panelOutputs.find(p => p.type === "large").power)[index];

          row.innerHTML = `
            <td class="py-2 px-4">${appliance.name}</td>
            <td class="py-2 px-4">${appliance.watts} W</td>
            <td class="py-2 px-4">${smallQty}</td>
            <td class="py-2 px-4">${mediumQty}</td>
            <td class="py-2 px-4">${largeQty}</td>
          `;
          table.appendChild(row);
        });
      })();

      calculatingBtn.classList.add("hidden");
      document.getElementById("calculate-btn").classList.remove("hidden");
      document.getElementById("results").classList.remove("hidden");
    }, 500);
  });

  document.getElementById("reset-btn").addEventListener("click", function () {
    document.getElementById("reset-btn").classList.add("hidden");
    resetingBtn.classList.remove("hidden");

    setTimeout(() => {
      document.getElementById("budget-amount").value = "";
      document.querySelector('.panel-price[data-type="small"]').value = "7500";
      document.querySelector('.panel-price[data-type="medium"]').value = "16000";
      document.querySelector('.panel-price[data-type="large"]').value = "22000";

      ["small", "medium", "large"].forEach(type => {
        document.getElementById(`${type}-panels`).textContent = "0";
        document.getElementById(`${type}-panels-cost`).textContent = "Rs. 0";
        document.getElementById(`${type}-power`).textContent = "0";
        document.getElementById(`${type}-inverter-size`).textContent = "0";
        document.getElementById(`${type}-inverter-cost`).textContent = "0";
        document.getElementById(`${type}-installation-cost`).textContent = "Rs. 30,000";
        document.getElementById(`${type}-total-cost`).textContent = "0";
      });

      document.getElementById("appliance-table").innerHTML = "";
      document.getElementById("results").classList.add("hidden");

      useSection.classList.remove("hidden");
      resetingBtn.classList.add("hidden");
      document.getElementById("reset-btn").classList.remove("hidden");
    }, 500);
  });

  document.querySelectorAll(".panel-price").forEach(input => {
    input.addEventListener("change", function () {
      let budget = parseFloat(document.getElementById("budget-amount").value);
      if (!isNaN(budget)) {
        document.getElementById("calculate-btn").click();
      }
    });
  });

  document.getElementById("generate-pdf-btn").addEventListener("click", async function () {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js");
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Solar System Calculation Report", 105, 15, { align: "center" });

    doc.setFontSize(12);
    let budget = document.getElementById("budget-amount").value || "Not specified";
    doc.text(`Budget: Rs. ${budget}`, 14, 25);

    let now = new Date();
    doc.text(`Generated on: ${now.toLocaleDateString()}`, 14, 35);

    doc.setFontSize(14);
    doc.text('Solar Panel Options', 14, 45);

    let systemTable = [];
    ["small", "medium", "large"].forEach(type => {
      let rowEl = document.querySelector(`#${type}-panels`).closest("tr");
      systemTable.push([
        rowEl.querySelector("td:first-child").textContent,
        `Rs. ${document.querySelector(`.panel-price[data-type="${type}"]`).value}`,
        document.getElementById(`${type}-panels`).textContent,
        document.getElementById(`${type}-panels-cost`).textContent,
        document.getElementById(`${type}-power`).textContent,
        document.getElementById(`${type}-inverter-size`).textContent,
        document.getElementById(`${type}-inverter-cost`).textContent,
        document.getElementById(`${type}-installation-cost`).textContent,
        document.getElementById(`${type}-total-cost`).textContent
      ]);
    });

    doc.autoTable({
      startY: 50,
      head: [[
        'Panel Type',
        'Single Panel Price',
        'Quantity',
        'Panel Cost',
        'Power Generated Loss 30%',
        'Inverter Size',
        'Inverter Cost',
        'Installation Cost',
        'Total Cost'
      ]],
      body: systemTable,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.setFontSize(14);
    doc.text("Recommended Appliances", 14, doc.autoTable.previous.finalY + 15);

    let applianceTable = [];
    document.querySelectorAll("#appliance-table tr").forEach(row => {
      let tds = row.querySelectorAll("td");
      applianceTable.push([
        tds[0].textContent,
        tds[1].textContent,
        tds[2].textContent,
        tds[3].textContent,
        tds[4].textContent
      ]);
    });

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [[
        'Appliance',
        'Power (W)',
        "Quantity (150W)",
        "Quantity (350W)",
        "Quantity (550W)"
      ]],
      body: applianceTable,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.setFontSize(10);
    doc.text('Note: Costs include solar panels, inverter, and installation for daytime operation. No battery included. Power generated accounts for 30% losses. Appliances prioritized to include high-power devices like AC when sufficient power is available.', 14, doc.autoTable.previous.finalY + 10, {
      maxWidth: 180
    });

    doc.save(`Solar_System_Calculation_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.pdf`);
  });
});
