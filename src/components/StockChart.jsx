import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Chart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(...registerables, CandlestickController, CandlestickElement);

const StockChart = ({ stockData }) => {
  const data = {
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map(item => ({
          x: new Date(item.date),
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close,
        })),
        borderColor: '#10b981',
        backgroundColor: stockData.map(item =>
          item.close >= item.open ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'
        ),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day' },
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Price (USD)' },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div data-testid="stock-chart-container" className="w-full h-full">
      <Chart type="candlestick" data={data} options={options} />
    </div>
  );
};

export default StockChart;