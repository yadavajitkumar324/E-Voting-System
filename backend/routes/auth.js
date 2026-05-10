import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const user = new User({ firstName, lastName, email, phone, password, verified: true });
    await user.save();
    const token = generateJWT(user._id);
    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: { id: user._id, firstName, lastName, email, hasVoted: user.hasVoted }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login - OTP return karo (fake OTP - 123456)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat hai!' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ya password galat hai!' });
    }
    // OTP return karo (123456 fixed)
    res.json({ message: 'OTP sent!', otp: '123456' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP - token return karo
router.post('/verify-login-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Koi bhi OTP accept karo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User nahi mila!' });
    }
    const token = generateJWT(user._id);
    res.json({
      message: 'Login successful!',
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email, hasVoted: user.hasVoted }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP (register)
router.post('/verify-otp', (req, res) => {
  res.json({ message: 'Verified!', success: true });
});

export default router;