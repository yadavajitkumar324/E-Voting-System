# SecureVote - Modern E-Voting Platform
# React + Node.js Edition

A modern, secure, and highly animated e-voting platform built with React and Node.js. Features beautiful UI components with Framer Motion animations, voting-related icons, and real-time statistics.

## ✨ Features

### 🎨 Modern UI with Animations
- Smooth page transitions with Framer Motion
- Animated candidate cards with interactive hover effects
- Pulse animations on voting buttons
- Floating shape animations on hero section
- Floating badge animations
- Modal confirmation with scale transitions
- Real-time vote distribution charts with animated bars

### 🔐 Security & Authentication
- User Registration & Login System
- Email OTP Verification (6-digit code)
- Password Encryption with bcrypt
- JWT Token-based authentication
- Session Management
- Secure Vote Tracking

### 🗳️ Voting Features
- Multiple Candidates Display with avatars
- Interactive candidate card selection
- Vote Confirmation Dialog with animations
- Real-time Vote Count Updates
- Unique Vote IDs generation
- Vote Receipt display
- One Vote Per User Per Election
- Prevents duplicate voting

### 📊 Admin Dashboard
- Real-time Statistics with animations
- Live Vote Distribution Bar Charts
- Voter Management
- Candidate Information
- Election Results visualization
- 5-second auto-refresh stats

### 🎯 Voting-Related Icons
- 🗳️ Ballot Box icon (branding)
- 🚀 Vote related icons from react-icons
- 📊 Chart and statistics icons
- ✓ Checkmark and verification icons
- 👥 User and voters icons
- 📈 Trending and growth icons

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes (320px - 4K)
- Touch-friendly interface
- Works on all modern browsers
- Adaptive grid layouts

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the backend server**
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the React development server**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📝 Usage

### Registration
1. Click "Get Started" on the landing page
2. Fill in your details:
   - First Name & Last Name
   - Email Address
   - Phone Number
   - Password (minimum 8 characters)
3. Receive OTP via email (demo: `000000`)
4. Enter OTP to verify email
5. Account created!

### Login
1. Go to Login page
2. Enter email and password
3. Verify with OTP (demo: `000000`)
4. Access voting page

### Casting a Vote
1. Review all candidates
2. Click on a candidate card to select
3. Click "Confirm Vote" button
4. Confirm in the modal
5. Vote is cast and recorded
6. Receive unique Vote ID
7. Cannot vote again

### Admin Dashboard
1. Navigate to `/admin` route
2. View real-time voting statistics
3. See candidate vote distribution
4. Monitor voting participation rate
5. Auto-refreshes every 5 seconds

## 🏗️ Project Structure

```
securevote/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── votes.js         # Voting endpoints
│   │   └── admin.js         # Admin dashboard endpoints
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Notification.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── VotingPage.js
│   │   │   └── AdminDashboard.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── HomePage.css
│   │   │   ├── AuthPages.css
│   │   │   ├── VotingPage.css
│   │   │   ├── AdminDashboard.css
│   │   │   ├── Notification.css
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
```

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **nodemailer** - Email sending (optional)
- **UUID** - Unique ID generation

### Frontend
- **React** - UI library
- **React Router** - Page routing
- **Framer Motion** - Advanced animations
- **react-icons** - Icon library (FaVoteYea, FiUser, MdHowToVote, etc.)
- **Axios** - HTTP client

## 🎬 Animations & Effects

### Page Transitions
- Fade and slide animations on route change
- Staggered animations for lists

### Component Animations
- **Candidate Cards**: Hover scale effect + shadow elevation
- **Vote Buttons**: Scale animation on click
- **Modal**: Scale from center with fade
- **Icons**: Rotation and bounce animations
- **Floating Shapes**: Continuous float animation
- **Vote Receipt**: Scale in animation
- **Chart Bars**: Animated fill animation

### Interactive Effects
- Button hover effects with transform
- Card elevation on hover
- Icon rotation animations
- Pulse animations on success states
- Glow effects around selected elements

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **OTP Verification**: Email-based verification
- **CORS Protection**: Controlled cross-origin access
- **Vote Anonymity**: No personal data attached to votes
- **One Vote Rule**: Prevents duplicate voting per user

## 📊 Demo Credentials

For testing purposes:
- **OTP for registration/login**: `000000`
- **Demo email**: any email address
- **Password**: minimum 8 characters

## 🎨 Customization

### Change Colors
Edit `:root` variables in `frontend/src/styles/index.css`:
```css
--primary: #6366f1;
--secondary: #ec4899;
--success: #10b981;
```

### Change Animations
Modify animation speeds in individual component files:
```javascript
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Add New Candidates
Edit `backend/routes/votes.js`:
```javascript
const candidates = {
  newCandidate: { id: 'new', name: 'Candidate Name', party: 'Party', votes: 0 }
};
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Deploy Backend (Heroku)
```bash
cd backend
git init
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
```

## 📞 Support

For issues or questions, please contact support@securevote.com

## 📄 License

MIT License - feel free to use in your projects

## 🙏 Credits

Built with modern web technologies and best practices for secure, accessible, and beautiful voting experience.

---

**Happy Voting! 🗳️✨**
