import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StockChart from './components/StockChart';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState('IBM');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stock options for dropdown
  const stockOptions = [
    { value: 'IBM', label: 'IBM' },
    { value: 'AAPL', label: 'Apple Inc.' },
    { value: 'TSLA', label: 'Tesla Inc.' },
    { value: 'GOOGL', label: 'Alphabet Inc.' },
  ];

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedStock}&apikey=N8WR3XS3NJG0WNB4&outputsize=compact`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }

        const rawData = await response.json();
        const timeSeries = rawData['Time Series (Daily)'];
        if (!timeSeries) {
          throw new Error('Invalid data format from API');
        }

        const data = Object.entries(timeSeries)
          .map(([date, values]) => ({
            date,
            open: parseFloat(values['1. open']),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            close: parseFloat(values['4. close']),
          }))
          .slice(0, 10);

        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching stock data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, [selectedStock]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Navigation Bar */}
          <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">TradeChip</Link>
              <div className="space-x-4">
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <AuthContext.Consumer>
                  {({ user, logout }) => (
                    user ? (
                      <button
                        onClick={() => logout()}
                        className="hover:underline"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/signup" className="hover:underline">Sign Up</Link>
                      </>
                    )
                  )}
                </AuthContext.Consumer>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mx-auto p-6">
                  <h1 className="text-3xl font-bold text-center mb-6">
                    Welcome to TradeChip
                  </h1>
                  <p className="text-center text-lg mb-8">
                    Analyze trading strategies and make informed decisions with real-time stock data.
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold">Stock Performance ({selectedStock})</h2>
                      <select
                        value={selectedStock}
                        onChange={(e) => setSelectedStock(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {stockOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {loading ? (
                      <div className="h-[600px] flex items-center justify-center">
                        <p>Loading stock data...</p>
                      </div>
                    ) : error ? (
                      <div className="h-[600px] flex items-center justify-center">
                        <p className="text-red-500">{error}</p>
                      </div>
                    ) : (
                      <div className="h-[600px]">
                        <StockChart stockData={stockData} />
                      </div>
                    )}
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          {/* Footer */}
          <footer className="bg-blue-600 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>© 2025 TradeChip. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;