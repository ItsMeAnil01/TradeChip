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
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Chart type="candlestick" data={data} options={options} />
    </div>
  );
};

export default StockChart;