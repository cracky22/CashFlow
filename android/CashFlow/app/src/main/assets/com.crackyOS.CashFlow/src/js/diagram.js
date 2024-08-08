let balanceChart;  // Variable für das Chart-Objekt

function loadChart() {
    const ctx = document.getElementById("balanceChart").getContext("2d");
    const balanceHistory = JSON.parse(localStorage.getItem("balanceHistory")) || [];

    // Daten aggregieren: Summiere die Werte nach Datum
    const aggregatedData = balanceHistory.reduce((acc, entry) => {
        const date = entry.date;
        const value = parseFloat(entry.value);

        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += value;
        return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);

    // Daten für Einnahmen und Ausgaben separieren
    const incomeData = data.map(value => (value > 0 ? value : 0));
    const expenseData = data.map(value => (value < 0 ? value : 0));

    // Wenn das Diagramm bereits existiert, zerstöre es, bevor es neu erstellt wird
    if (balanceChart) {
        balanceChart.destroy();
    }

    const config = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Einnahmen",
                    data: incomeData,
                    borderColor: "#4caf50",  // Modernes Grün
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,  // Linien etwas geschwungener machen
                    pointBackgroundColor: "#4caf50",
                    pointBorderColor: "#4caf50",
                },
                {
                    label: "Ausgaben",
                    data: expenseData,
                    borderColor: "#f44336",  // Modernes Rot
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,  // Linien etwas geschwungener machen
                    pointBackgroundColor: "#f44336",
                    pointBorderColor: "#f44336",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: Math.floor(Math.min(...expenseData) * 1.1),
                    max: Math.ceil(Math.max(...incomeData) * 1.1),
                    ticks: {
                        stepSize: 1,  // Schrittweite auf der Y-Achse auf 1 festlegen
                        callback: function(value) {
                            return Number.isInteger(value) ? value : null;  // Zeige nur ganze Zahlen
                        }
                    }
                }
            }
        }
    };

    // Neues Diagramm erstellen
    balanceChart = new Chart(ctx, config);
}

// Initiales Laden des Diagramms
loadChart();
