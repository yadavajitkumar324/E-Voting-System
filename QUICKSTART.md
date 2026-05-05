# SecureVote - Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager

## 🚀 Step 1: Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

**Expected Output:**
```
🗳️ SecureVote Backend running on http://localhost:5000
```

## 🎨 Step 2: Start React Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

**Expected Output:**
```
Compiled successfully!
On Your Network: http://localhost:3000
```

The application should automatically open in your browser at `http://localhost:3000`

## 📝 Test Account Setup

### For Testing:
- Use any email address: `test@example.com`
- Password: `test12345` (minimum 8 characters)
- OTP Code: `000000` (for demo purposes)

## 🗳️ How to Vote

1. **Register**: Click "Get Started" → Fill form → Enter OTP (000000) → Verify
2. **Login**: Enter credentials → Enter OTP (000000) → Success
3. **Vote**: Select a candidate → Click "Confirm Vote" → Confirm in modal → Vote recorded
4. **Receipt**: View your unique Vote ID and timestamp

## 📊 Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin`

View:
- Total voters registered
- Total votes cast
- Voting participation rate
- Real-time candidate vote distribution
- Animated bar charts
- Auto-refreshing stats (every 5 seconds)

## 🎨 Features Demo

### Beautiful Animations
- Candidate cards with hover effects
- Vote confirmation modal with smooth transitions
- Real-time chart animations
- Floating background shapes
- Success screen with celebratory animations

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Adaptive layouts

### Security
- Password encryption
- OTP email verification
- One vote per user enforcement
- Unique vote IDs
- JWT authentication

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Backend (Port 5000)
netstat -ano | findstr :5000

# Frontend (Port 3000)
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### CORS Issues
Make sure backend is running on port 5000 and frontend on port 3000.
Check `.env` file in backend: `CORS_ORIGIN=http://localhost:3000`

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Project Structure

```
securevote/
├── backend/                 # Node.js + Express server
│   ├── routes/             # API routes
│   ├── server.js           # Main entry
│   └── package.json
│
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── styles/        # CSS files
│   └── package.json
│
└── SETUP.md               # This file
```

## 🚀 Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 3000
3. ✅ Create test account
4. ✅ Cast a vote
5. ✅ Check admin dashboard

## 💡 Tips

- Check browser console (F12) for debugging
- Use React Developer Tools extension
- Check backend terminal for API errors
- Refresh page if styles don't load

## 📞 Support

Need help? Check the main README.md for detailed documentation.

---

**Enjoy using SecureVote! 🗳️✨**
