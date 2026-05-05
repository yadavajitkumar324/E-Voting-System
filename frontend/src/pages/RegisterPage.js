import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { authAPI } from '../utils/api';
import Notification from '../components/Notification';
import '../styles/AuthPages.css';

const RegisterPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [step, setStep] = useState('register'); // register, otp
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [displayedOtp, setDisplayedOtp] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name required';
    if (!formData.lastName) newErrors.lastName = 'Last name required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.phone) newErrors.phone = 'Phone required';
    if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      setEmail(formData.email);
      setDisplayedOtp(response.data.otp);
      setStep('otp');
      setNotification({ message: 'OTP: ' + response.data.otp, type: 'success' });
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Registration failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.verifyOTP({ email, otp });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setNotification({ message: 'Email verified! Welcome!', type: 'success' });
      setTimeout(() => navigate('/voting'), 2000);
    } catch (error) {
      setNotification({ message: 'Invalid OTP', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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

        {step === 'register' ? (
          <form onSubmit={handleRegister} className="auth-form">
            <h2>Create Your Account</h2>
            
            <div className="form-row">
              <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </motion.div>

              <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </motion.div>
            </div>

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </motion.div>

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </motion.div>

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum 8 characters"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </motion.div>

            <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>

            <p className="auth-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="auth-form">
            <h2>Verify Your Email</h2>
            <p className="otp-subtitle">Enter the 6-digit OTP sent to {email}</p>

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
              <button type="button" onClick={() => setStep('register')} className="link-btn">
                Back to Registration
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

export default RegisterPage;
