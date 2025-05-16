import React from 'react';
import { render, screen } from '@testing-library/react';
import StockChart from '../components/StockChart';

// Mock Chart.js and related modules
jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  registerables: [],
}));
jest.mock('chartjs-chart-financial', () => ({
  CandlestickController: jest.fn(),
  CandlestickElement: jest.fn(),
}));
jest.mock('chartjs-adapter-date-fns', () => ({}));

describe('StockChart Component', () => {
  const sampleStockData = [
    { date: '2025-05-01', open: 100, high: 105, low: 98, close: 102 },
    { date: '2025-05-02', open: 102, high: 108, low: 100, close: 106 },
  ];

  it('renders the chart container', () => {
    render(<StockChart stockData={sampleStockData} />);
    const chartContainer = screen.getByTestId('stock-chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});