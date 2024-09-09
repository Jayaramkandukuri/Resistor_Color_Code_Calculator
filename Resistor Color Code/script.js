const colors = [
    { name: "Select", value: 0, multiplier: 1, tolerance: null, hex: "FFFFFF"},
    { name: "Black", value: 0, multiplier: 1, tolerance: null, hex: "#000000" },
    { name: "Brown", value: 1, multiplier: 10, tolerance: 1, hex: "#8B4513" },
    { name: "Red", value: 2, multiplier: 100, tolerance: 2, hex: "#FF0000" },
    { name: "Orange", value: 3, multiplier: 1000, tolerance: null, hex: "#FFA500" },
    { name: "Yellow", value: 4, multiplier: 10000, tolerance: null, hex: "#FFFF00" },
    { name: "Green", value: 5, multiplier: 100000, tolerance: 0.5, hex: "#008000" },
    { name: "Blue", value: 6, multiplier: 1000000, tolerance: 0.25, hex: "#0000FF" },
    { name: "Violet", value: 7, multiplier: 10000000, tolerance: 0.1, hex: "#8A2BE2" },
    { name: "Gray", value: 8, multiplier: 100000000, tolerance: 0.05, hex: "#808080" },
    { name: "White", value: 9, multiplier: 1000000000, tolerance: null, hex: "#FFFFFF" },
    { name: "Gold", value: null, multiplier: 0.1, tolerance: 5, hex: "#FFD700" },
    { name: "Silver", value: null, multiplier: 0.01, tolerance: 10, hex: "#C0C0C0" },
];

function populateColorSelectors() {
    const bandSelectors = ["band1", "band2", "band3", "band4", "band5"];
    bandSelectors.forEach(bandId => {
        const selectElement = document.getElementById(bandId);
        selectElement.innerHTML = "";
        colors.forEach(color => {
            const option = document.createElement("option");
            option.value = color.name;
            option.textContent = color.name;
            selectElement.appendChild(option);
        });
    });
}

function updateBands() {
    const bandCount = document.getElementById("bands").value;
    const band5Container = document.getElementById("band5Container");
    if (bandCount == 5) {
        band5Container.style.display = "block";
        document.getElementById("band4Container").querySelector("label").textContent = "Multiplier:";
        document.getElementById("band5Container").querySelector("label").textContent = "Tolerance:";
    } else {
        band5Container.style.display = "none";
        document.getElementById("band4Container").querySelector("label").textContent = "Multiplier:";
    }
    calculateResistance();
}

function updateResistorTable() {
    const band1 = document.getElementById("band1").value;
    const band2 = document.getElementById("band2").value;
    const band3 = document.getElementById("band3").value;
    const band4 = document.getElementById("band4").value;
    const band5 = document.getElementById("band5") ? document.getElementById("band5").value : null;

    const bands = [band1, band2, band3, band4, band5].filter(Boolean);
    const bandElements = ["band1Color", "band2Color", "band3Color", "band4Color", "band5Color"];

    bandElements.forEach((elementId, index) => {
        const cell = document.getElementById(elementId);
        const color = colors.find(color => color.name === bands[index]);
        cell.style.backgroundColor = color ? color.hex : "#FFFFFF";
        cell.textContent = color ? color.name : "None";
    });
}

function calculateResistance() {
    const band1 = document.getElementById("band1").value;
    const band2 = document.getElementById("band2").value;
    const band3 = document.getElementById("band3").value;
    const band4 = document.getElementById("band4").value;
    const band5 = document.getElementById("band5") ? document.getElementById("band5").value : null;

    const band1Value = colors.find(color => color.name === band1)?.value;
    const band2Value = colors.find(color => color.name === band2)?.value;
    const band3Value = colors.find(color => color.name === band3)?.value;
    const multiplier = colors.find(color => color.name === (document.getElementById("bands").value == 5 ? band4 : band3))?.multiplier;
    const toleranceValue = document.getElementById("bands").value == 5
        ? colors.find(color => color.name === band5)?.tolerance
        : colors.find(color => color.name === band4)?.tolerance;

    if (band1Value == null || band2Value == null || (document.getElementById("bands").value == 4 && band3Value == null) || multiplier == null || toleranceValue == null) {
        return;
    }

    let resistance;
    if (document.getElementById("bands").value == 4) {
        resistance = (band1Value * 10 + band2Value) * multiplier;
    } else {
        resistance = (band1Value * 100 + band2Value * 10 + band3Value) * multiplier;
    }

    document.getElementById("resistance").textContent = (resistance / 1000).toFixed(4);
    document.getElementById("tolerance").textContent = toleranceValue ? `${toleranceValue}%` : "N/A";

    updateResistorTable();
}

populateColorSelectors();
updateBands();
