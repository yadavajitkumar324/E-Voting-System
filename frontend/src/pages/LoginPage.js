import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../utils/api';
import Notification from '../components/Notification';
import '../styles/AuthPages.css';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [step, setStep] = useState('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [displayedOtp, setDisplayedOtp] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors({
        email: !email ? 'Email required' : '',
        password: !password ? 'Password required' : ''
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      setDisplayedOtp(response.data.otp);
      setStep('otp');
      setOtp('');
      setNotification({ message: 'OTP: ' + response.data.otp, type: 'success' });
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLoginOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.verifyLoginOTP({ email, otp });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setNotification({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/voting'), 1500);
    } catch (error) {
      setNotification({ message: 'Invalid OTP', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="auth-page">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="auth-header" whileHover={{ scale: 1.05 }}>
          <span className="auth-icon">🗳️</span>
          <h1>SecureVote</h1>
        </motion.div>

        {step === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Welcome Back</h2>
            <p>Login to your account</p>

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </motion.div>

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>

            <p className="auth-link">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyLoginOTP} className="auth-form">
            <h2>Verify OTP</h2>
            <p className="otp-subtitle">Enter the 6-digit code sent to {email}</p>

            {displayedOtp && (
              <motion.div
                className="otp-display-box"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="otp-label">📧 Your OTP:</p>
                <p className="otp-code">{displayedOtp}</p>
                <p className="otp-hint">(Also check your email)</p>
              </motion.div>
            )}

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>One-Time Password</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="000000"
                maxLength="6"
                className="otp-input"
              />
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={loading || otp.length !== 6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </motion.button>

            <p className="auth-link">
              <button type="button" onClick={() => { setStep('login'); setOtp(''); }} className="link-btn">
                Back to Login
              </button>
            </p>
          </form>
        )}
      </motion.div>

      <motion.div className="auth-decoration">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
