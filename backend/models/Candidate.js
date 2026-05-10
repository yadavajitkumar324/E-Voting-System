import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  symbol: { type: String, default: '🗳️' },
  votes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Candidate', candidateSchema);