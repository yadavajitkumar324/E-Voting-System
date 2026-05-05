import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaVoteYea, FaChartPie, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { adminAPI } from '../utils/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div className="admin-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">📊</span>
            <span>SecureVote Admin</span>
          </div>
          <div className="nav-menu">
            <button onClick={() => navigate('/')} className="nav-link">Back to Home</button>
          </div>
        </div>
      </nav>

      <div className="admin-container">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>📈 Voting Dashboard</h1>
          <p>Real-time election statistics and analytics</p>
        </motion.div>

        {loading ? (
          <div className="loader">Loading dashboard...</div>
        ) : (
          <motion.div
            className="stats-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stats Cards */}
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                <FaUsers size={32} />
              </div>
              <div className="stat-content">
                <h3>Total Voters</h3>
                <p className="stat-value">{stats.totalVoters}</p>
                <span className="stat-label">Registered</span>
              </div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <FaVoteYea size={32} />
              </div>
              <div className="stat-content">
                <h3>Votes Cast</h3>
                <p className="stat-value">{stats.totalVotesCast}</p>
                <span className="stat-label">Submitted</span>
              </div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                <MdTrendingUp size={32} />
              </div>
              <div className="stat-content">
                <h3>Voting Rate</h3>
                <p className="stat-value">{stats.votingRate}%</p>
                <span className="stat-label">Participation</span>
              </div>
            </motion.div>

            {/* Candidates Results */}
            <motion.div className="results-card" variants={itemVariants}>
              <h2>Candidate Results</h2>
              <div className="candidates-results">
                {stats.candidates.map((candidate, index) => (
                  <motion.div
                    key={index}
                    className="result-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="result-header">
                      <span className="candidate-name">{candidate.name}</span>
                      <span className="candidate-votes">{candidate.votes} votes</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${candidate.percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="percentage">{candidate.percentage}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Chart Visualization */}
            <motion.div className="chart-card" variants={itemVariants}>
              <h2>Vote Distribution</h2>
              <div className="chart-container">
                {stats.candidates.map((candidate, index) => {
                  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                  const maxVotes = Math.max(...stats.candidates.map(c => c.votes));
                  const height = (candidate.votes / maxVotes) * 100;
                  return (
                    <motion.div
                      key={index}
                      className="bar-column"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <div
                        className="bar"
                        style={{ background: colors[index] }}
                      />
                      <span className="bar-label">{candidate.name.split(' ')[0]}</span>
                      <span className="bar-value">{candidate.votes}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
