import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory database (replace with real DB in production)
const users = new Map();
const otpStore = new Map();

// Helper functions
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
};

// Simple password hashing (for demo)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Register
router.post('/register', (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (users.has(email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Generate OTP
    const otp = generateOTP();
    const userId = uuidv4();

    // Store user (pending verification)
    users.set(email, {
      id: userId,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      verified: false,
      createdAt: new Date()
    });

    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    console.log(`\n🔐 OTP for ${email}: ${otp}\n`); // For demo purposes
    res.json({ 
      message: 'Registration successful. Use OTP: ' + otp, 
      otp,
      displayOtp: true 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otpStore.has(email)) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    const stored = otpStore.get(email);
    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (stored.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Mark as verified
    const user = users.get(email);
    user.verified = true;
    otpStore.delete(email);

    const token = generateJWT(user.id);
    res.json({ 
      message: 'Email verified successfully',
      token,
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = users.get(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = hashPassword(password) === user.password;
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    // Generate OTP for re-verification
    const otp = generateOTP();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });
    console.log(`\n🔐 Login OTP for ${email}: ${otp}\n`);

    res.json({ 
      message: 'OTP sent to your email. Demo OTP: ' + otp,
      email,
      otp,
      displayOtp: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify Login OTP
router.post('/verify-login-otp', (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    const user = users.get(email);
    const token = generateJWT(user.id);
    otpStore.delete(email);

    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
