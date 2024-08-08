function getCurrentMonthData(balanceHistory) {
  const now = new Date();
  const currentMonth = now.getMonth();  // 0-based index (0 = January)
  const currentYear = now.getFullYear();

  return balanceHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
  });
}

function calculateTotals(data) {
  const totalIncome = data.filter(value => value > 0).reduce((acc, value) => acc + value, 0);
  const totalExpense = data.filter(value => value < 0).reduce((acc, value) => acc + Math.abs(value), 0);

  return {
      totalIncome,
      totalExpense
  };
}

function loadChart() {
  const ctx = document.getElementById("balanceChart").getContext("2d");
  const balanceHistory = JSON.parse(localStorage.getItem("balanceHistory")) || [];

  const monthlyData = getCurrentMonthData(balanceHistory);

  if (monthlyData.length === 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      return;  // No data to display
  }

  const data = monthlyData.map(entry => parseFloat(entry.value));
  const { totalIncome, totalExpense } = calculateTotals(data);

  const chartData = {
      labels: ['Einnahmen', 'Ausgaben'],
      datasets: [{
          data: [totalIncome, totalExpense],
          backgroundColor: ['rgba(76, 175, 80, 0.6)', 'rgba(244, 67, 54, 0.6)'],
          borderColor: ['rgba(76, 175, 80, 1)', 'rgba(244, 67, 54, 1)'],
          borderWidth: 1
      }]
  };

  const config = {
      type: 'pie',
      data: chartData,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          const value = tooltipItem.raw;
                          return `${tooltipItem.label}: ${value.toFixed(2)} €`;
                      }
                  }
              }
          }
      }
  };

  // Zerstöre das bestehende Diagramm, falls vorhanden
  if (window.balanceChart && window.balanceChart instanceof Chart) {
      window.balanceChart.destroy();
  }

  // Erstelle ein neues Diagramm
  window.balanceChart = new Chart(ctx, config);
}

loadChart();
