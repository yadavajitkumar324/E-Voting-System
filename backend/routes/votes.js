import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Candidate from '../models/Candidate.js';

const router = express.Router();

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Login karo pehle!' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token!' });
  }
};

// Get All Candidates
router.get('/candidates', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cast Vote
router.post('/cast', auth, async (req, res) => {
  try {
    const { candidateId } = req.body;
    const user = await User.findById(req.userId);

    if (user.hasVoted) {
      return res.status(400).json({ message: 'Tum pehle hi vote de chuke ho!' });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate nahi mila!' });
    }

    candidate.votes += 1;
    await candidate.save();

    user.hasVoted = true;
    user.votedFor = candidateId;
    await user.save();

    res.json({ message: `${candidate.name} ko vote de diya! ✅` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Stats
router.get('/stats', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    const stats = candidates.map(c => ({
      id: c._id,
      name: c.name,
      party: c.party,
      symbol: c.symbol,
      votes: c.votes,
      percentage: totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : 0
    }));
    res.json({ totalVotes, candidates: stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check voted
router.get('/check-voted', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ hasVoted: user.hasVoted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;