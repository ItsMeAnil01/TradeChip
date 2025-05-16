import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(...registerables);

const Dashboard = () => {
  // Sample data for profit trend chart (replace with backend API data)
  const profitData = {
    labels: ['2025-05-01', '2025-05-02', '2025-05-03', '2025-05-04', '2025-05-05'],
    datasets: [
      {
        label: 'Portfolio Profit (USD)',
        data: [500, 700, 650, 900, 1200],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Profit (USD)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  // Sample recent trades (replace with backend API data)
  const recentTrades = [
    { id: 1, stock: 'AAPL', type: 'Buy', price: 150.25, date: '2025-05-05' },
    { id: 2, stock: 'TSLA', type: 'Sell', price: 700.50, date: '2025-05-04' },
    { id: 3, stock: 'GOOGL', type: 'Buy', price: 2800.75, date: '2025-05-03' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trading Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Profit</h2>
          <p className="text-2xl text-green-600">$1,200.50</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Trades</h2>
          <p className="text-2xl text-blue-600">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Win Rate</h2>
          <p className="text-2xl text-purple-600">75%</p>
        </div>
      </div>

      {/* Profit Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profit Trend</h2>
        <div className="h-96">
          <Line data={profitData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Trades Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Stock</th>
                <th className="p-3">Type</th>
                <th className="p-3">Price</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map(trade => (
                <tr key={trade.id} className="border-t">
                  <td className="p-3">{trade.stock}</td>
                  <td className="p-3">{trade.type}</td>
                  <td className="p-3">${trade.price.toFixed(2)}</td>
                  <td className="p-3">{trade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;