import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/Login';
import RegisterPage from './pages/register';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/Orders';
import InventoryPage from './pages/Inventory';
import ProductionPage from './pages/Production';

function App() {
  // Track authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Handler for login/register success
  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  // Handler for logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Auth guard for protected routes
  const requireAuth = (element) =>
    isAuthenticated ? (
      <div className="container mt-5">
        <nav className="mb-4">
          <a className="btn btn-primary me-2" href="/">Dashboard</a>
          <a className="btn btn-primary me-2" href="/inventory">Inventory</a>
          <a className="btn btn-primary me-2" href="/orders">Orders</a>
          <a className="btn btn-primary me-2" href="/production">Production</a>
          <button className="btn btn-danger float-end" onClick={handleLogout}>Logout</button>
        </nav>
        {element}
      </div>
    ) : (
      <Navigate to="/login" replace />
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleAuth} />} />
        <Route path="/register" element={<RegisterPage onRegister={handleAuth} />} />
        <Route path="/" element={requireAuth(<Dashboard />)} />
        <Route path="/orders" element={requireAuth(<OrdersPage />)} />
        <Route path="/inventory" element={requireAuth(<InventoryPage />)} />
        <Route path="/production" element={requireAuth(<ProductionPage />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;