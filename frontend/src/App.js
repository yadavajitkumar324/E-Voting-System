import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import VotingPage from './pages/VotingPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />
        <Route path="/register" element={user ? <Navigate to="/voting" /> : <RegisterPage setUser={setUser} />} />
        <Route path="/login" element={user ? <Navigate to="/voting" /> : <LoginPage setUser={setUser} />} />
        <Route path="/voting" element={user ? <VotingPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
