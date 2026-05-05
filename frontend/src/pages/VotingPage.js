import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiUser, FiAward } from 'react-icons/fi';
import { MdHowToVote, MdVerified } from 'react-icons/md';
import { votesAPI } from '../utils/api';
import Notification from '../components/Notification';
import '../styles/VotingPage.css';

const VotingPage = ({ user, onLogout }) => {
  const [candidates, setCandidates] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmVote, setConfirmVote] = useState(false);
  const [voteId, setVoteId] = useState(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);

  useEffect(() => {
    fetchCandidates();
    checkIfVoted();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await votesAPI.getCandidates();
      setCandidates(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to load candidates', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const checkIfVoted = async () => {
    try {
      const response = await votesAPI.checkVoted(user.id);
      if (response.data.hasVoted) {
        setVoteConfirmed(true);
      }
    } catch (error) {
      console.log('Check failed');
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;
    
    setVoting(true);
    try {
      const response = await votesAPI.cast({
        userId: user.id,
        candidateId: selectedCandidate.id
      });
      
      setVoteId(response.data.voteId);
      setVoteConfirmed(true);
      setConfirmVote(false);
      setNotification({ 
        message: `Vote cast for ${response.data.candidate}!`, 
        type: 'success' 
      });
      setTimeout(() => setSelectedCandidate(null), 2000);
    } catch (error) {
      setNotification({ 
        message: error.response?.data?.message || 'Failed to cast vote', 
        type: 'error' 
      });
    } finally {
      setVoting(false);
    }
  };

  if (voteConfirmed && voteId) {
    return (
      <motion.div className="voting-page">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <span className="logo-icon">🗳️</span>
              <span>SecureVote</span>
            </div>
            <div className="nav-menu">
              <span className="user-info">Welcome, {user.firstName}!</span>
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        </nav>

        <div className="voting-container">
          <motion.div
            className="vote-success-card"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <motion.div
              className="success-icon"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheckCircle size={64} />
            </motion.div>
            <h1>Vote Successfully Cast!</h1>
            <p className="success-message">Thank you for participating in the democratic process</p>
            
            <motion.div
              className="vote-receipt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="receipt-item">
                <span>Vote ID:</span>
                <span className="receipt-value">{voteId}</span>
              </div>
              <div className="receipt-item">
                <span>Time:</span>
                <span className="receipt-value">{new Date().toLocaleString()}</span>
              </div>
            </motion.div>

            <motion.button
              onClick={() => window.location.href = '/'}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="voting-page">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🗳️</span>
            <span>SecureVote</span>
          </div>
          <div className="nav-menu">
            <span className="user-info">Welcome, {user.firstName}!</span>
            <button onClick={onLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>

      <div className="voting-container">
        <motion.div
          className="voting-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MdHowToVote size={40} />
          <h1>Cast Your Vote</h1>
          <p>Select your preferred candidate to vote</p>
        </motion.div>

        {loading ? (
          <div className="loader">Loading candidates...</div>
        ) : (
          <div className="candidates-grid">
            <AnimatePresence>
              {candidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  className={`candidate-card ${selectedCandidate?.id === candidate.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCandidate(candidate)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="candidate-avatar"
                    animate={selectedCandidate?.id === candidate.id ? { boxShadow: [
                      '0 0 0 0px rgba(99, 102, 241, 0.7)',
                      '0 0 0 20px rgba(99, 102, 241, 0)'
                    ] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <FiUser size={48} />
                  </motion.div>

                  <h3>{candidate.name}</h3>
                  <p className="candidate-party">{candidate.party}</p>

                  {selectedCandidate?.id === candidate.id && (
                    <motion.div
                      className="selected-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <MdVerified size={24} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {selectedCandidate && !confirmVote && (
            <motion.div
              className="vote-action"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>You have selected <strong>{selectedCandidate.name}</strong></p>
              <motion.button
                onClick={() => setConfirmVote(true)}
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm Vote
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {confirmVote && selectedCandidate && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setConfirmVote(false)}
            >
              <motion.div
                className="confirmation-modal"
                initial={{ scale: 0, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <MdHowToVote size={40} color="var(--primary)" />
                  <h2>Confirm Your Vote</h2>
                </div>
                <p className="modal-message">
                  Are you sure you want to vote for <strong>{selectedCandidate.name}</strong>? This action cannot be undone.
                </p>
                <div className="modal-actions">
                  <motion.button
                    onClick={() => setConfirmVote(false)}
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleVote}
                    className="btn btn-success"
                    disabled={voting}
                    whileHover={{ scale: 1.05 }}
                  >
                    {voting ? 'Casting...' : 'Confirm & Vote'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VotingPage;
