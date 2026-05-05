import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaChartBar, FaLock, FaCheckCircle, FaUsers, FaEye } from 'react-icons/fa';
import '../styles/HomePage.css';

const HomePage = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaShieldAlt size={40} />,
      title: 'Secure & Encrypted',
      description: 'Advanced encryption ensures your vote is completely secure and anonymous'
    },
    {
      icon: <FaLock size={40} />,
      title: 'Authentication',
      description: 'Multi-factor OTP verification for enhanced security'
    },
    {
      icon: <FaChartBar size={40} />,
      title: 'Real-time Results',
      description: 'Live vote counting and instant result visualization'
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Transparent Process',
      description: 'Complete transparency in the voting process'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🗳️</span>
            <span>SecureVote</span>
          </div>
          <div className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            {user ? (
              <>
                <span className="user-greeting">Welcome, {user.firstName}!</span>
                <button onClick={() => navigate('/voting')} className="nav-link btn-nav">Vote Now</button>
                <button onClick={onLogout} className="nav-link btn-logout">Logout</button>
              </>
            ) : (
              <>
                <a href="/login" className="nav-link btn-login">Login</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/online-voting.png" alt="Online Voting" className="voting-image" />
        </motion.div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="gradient-text">Secure • Transparent • Digital Voting</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Experience the future of voting with our advanced e-voting platform
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {user ? (
              <motion.button
                onClick={() => navigate('/voting')}
                className="btn btn-primary btn-hero"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cast Your Vote
              </motion.button>
            ) : (
              <>
                <motion.a
                  href="/register"
                  className="btn btn-primary btn-hero"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="/login"
                  className="btn btn-secondary btn-hero"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Already have an account?
                </motion.a>
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-animation"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose SecureVote?
        </motion.h2>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="feature-icon"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="stat-box" variants={itemVariants}>
            <h3>50K+</h3>
            <p>Active Users</p>
          </motion.div>
          <motion.div className="stat-box" variants={itemVariants}>
            <h3>100%</h3>
            <p>Secure & Encrypted</p>
          </motion.div>
          <motion.div className="stat-box" variants={itemVariants}>
            <h3>1M+</h3>
            <p>Votes Cast</p>
          </motion.div>
          <motion.div className="stat-box" variants={itemVariants}>
            <h3>24/7</h3>
            <p>Support Available</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SecureVote</h4>
            <p>Making democracy digital and secure</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="/admin">Admin</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SecureVote. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default HomePage;
