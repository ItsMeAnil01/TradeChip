import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

// Mock fetch for Alpha Vantage API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        'Time Series (Daily)': {
          '2025-05-01': { '1. open': '100', '2. high': '105', '3. low': '98', '4. close': '102' },
          '2025-05-02': { '1. open': '102', '2. high': '108', '3. low': '100', '4. close': '106' },
        },
      }),
  })
);

// Mock StockChart to avoid Chart.js rendering issues
jest.mock('../components/StockChart', () => ({ stockData }) => (
  <div data-testid="stock-chart">{stockData.length} data points</div>
));

describe('App Component', () => {
  it('renders homepage with stock chart', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('Welcome to TradeChip')).toBeInTheDocument();
    expect(screen.getByText(/Stock Performance \(IBM\)/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('stock-chart')).toHaveTextContent('2 data points');
    });
  });

  it('changes stock data on dropdown selection', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'AAPL' } });

    expect(screen.getByText(/Stock Performance \(AAPL\)/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('stock-chart')).toHaveTextContent('2 data points');
    });
  });
});