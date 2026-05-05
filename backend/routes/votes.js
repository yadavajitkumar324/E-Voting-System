import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage
const votes = new Map();
const userVotes = new Map(); // Track which users have voted

const candidates = {
  alex: { id: 'alex', name: 'Alex Johnson', party: 'Democratic Party', votes: 0 },
  sarah: { id: 'sarah', name: 'Sarah Williams', party: 'Republican Party', votes: 0 },
  michael: { id: 'michael', name: 'Michael Chen', party: 'Independent', votes: 0 },
  emma: { id: 'emma', name: 'Emma Rodriguez', party: 'Green Party', votes: 0 }
};

// Cast Vote
router.post('/cast', (req, res) => {
  try {
    const { userId, candidateId } = req.body;

    if (!userId || !candidateId) {
      return res.status(400).json({ message: 'User ID and Candidate ID required' });
    }

    // Check if user already voted
    if (userVotes.has(userId)) {
      return res.status(400).json({ message: 'You have already voted' });
    }

    if (!candidates[candidateId]) {
      return res.status(400).json({ message: 'Invalid candidate' });
    }

    const voteId = uuidv4();
    const vote = {
      id: voteId,
      userId,
      candidateId,
      timestamp: new Date(),
      confirmed: true
    };

    votes.set(voteId, vote);
    userVotes.set(userId, voteId);
    candidates[candidateId].votes++;

    res.json({ 
      message: 'Vote cast successfully',
      voteId,
      candidate: candidates[candidateId].name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Candidates
router.get('/candidates', (req, res) => {
  try {
    const candidateList = Object.values(candidates);
    res.json(candidateList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Vote Stats
router.get('/stats', (req, res) => {
  try {
    const totalVotes = Array.from(votes.values()).length;
    const stats = Object.values(candidates).map(c => ({
      id: c.id,
      name: c.name,
      votes: c.votes,
      percentage: totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : 0
    }));

    res.json({
      totalVotes,
      candidates: stats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if user has voted
router.get('/check-voted/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const hasVoted = userVotes.has(userId);
    res.json({ hasVoted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
