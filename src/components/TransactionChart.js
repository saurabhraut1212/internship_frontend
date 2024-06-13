import React, { useEffect, useRef } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController } from 'chart.js';


// Register the necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController);

const TransactionsChart = ({ transactionChart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!transactionChart || transactionChart.length === 0) {
      return;
    }

    const ctx = chartRef.current.getContext('2d');

    const calculateDataForPriceRanges = (transactions) => {
      return transactions.map(range => range.count);
    };

    const chartData = {
      labels: transactionChart.map(range => range.range),
      datasets: [{
        label: 'Number of Transactions',
        data: calculateDataForPriceRanges(transactionChart),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }],
    };

    const maxTransactionCount = Math.max(...calculateDataForPriceRanges(transactionChart));
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            max: maxTransactionCount + 5,
          },
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [transactionChart]);

  if (!transactionChart || transactionChart.length === 0) {
    return <div>No transactions available</div>;
  }

  return (
    <div style={{ width: '400px', height: '200px' }}>
      <h2>Transactions Chart</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TransactionsChart;
