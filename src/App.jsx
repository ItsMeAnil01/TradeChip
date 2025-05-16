import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StockChart from './components/StockChart';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  // Sample stock data (replace with API data from backend)
  const sampleStockData = [
    { date: '2025-05-01', open: 100, high: 105, low: 98, close: 102 },
    { date: '2025-05-02', open: 102, high: 108, low: 100, close: 106 },
    { date: '2025-05-03', open: 106, high: 110, low: 104, close: 108 },
    { date: '2025-05-04', open: 108, high: 112, low: 106, close: 110 },
    { date: '2025-05-05', open: 110, high: 115, low: 108, close: 113 },
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
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Sign Up</Link>
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
                    <h2 className="text-2xl font-semibold mb-4">Stock Performance</h2>
                    <div className="h-96">
                      <StockChart stockData={sampleStockData} />
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