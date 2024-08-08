const ctx = document.getElementById("balanceChart").getContext("2d");
const balanceHistory = JSON.parse(localStorage.getItem("balanceHistory"));

// Daten aufbereiten
const data = balanceHistory.map((entry) => parseFloat(entry.value));
const labels = balanceHistory.map((entry) => entry.date);

const backgroundColors = data.map((value) =>
  value >= 0 ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"
);
const borderColors = data.map((value) =>
  value >= 0 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)"
);

const config = {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Ausgabenverlauf",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: borderColors,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: Math.min(...data) * 1.1,
        max: Math.max(...data) * 1.1,
      },
    },
  },
};

const balanceChart = new Chart(ctx, config);
