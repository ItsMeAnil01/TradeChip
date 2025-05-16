import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TradingViewChart from './components/TradingViewChart';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext, useState } from 'react';
import './App.css';

function App() {
  const [selectedStock, setSelectedStock] = useState('NASDAQ:IBM');

  // Sample stock options for dropdown
  const stockOptions = [
    { value: 'NASDAQ:IBM', label: 'IBM' },
    { value: 'NASDAQ:AAPL', label: 'Apple Inc.' },
    { value: 'NASDAQ:TSLA', label: 'Tesla Inc.' },
    { value: 'NASDAQ:GOOGL', label: 'Alphabet Inc.' },
  ];

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
                      <h2 className="text-2xl font-semibold">Stock Performance</h2>
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
                    <div className="h-[600px]">
                      <TradingViewChart symbol={selectedStock} />
                    </div>
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