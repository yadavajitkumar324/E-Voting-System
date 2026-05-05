# 🗳️ SecureVote - E-Voting Platform

A modern, secure, and user-friendly e-voting platform with beautiful animations and real-time vote tracking.

## ✨ Features

### 🔐 Security & Authentication
- ✅ User Registration & Login System
- ✅ Email OTP Verification (6-digit code)
- ✅ Password Encryption
- ✅ Session Management
- ✅ Secure Vote Tracking

### 🎯 Voting Features
- ✅ Multiple Candidates Display
- ✅ Vote Confirmation Dialog
- ✅ Real-time Vote Count Updates
- ✅ Unique Vote IDs
- ✅ Vote Receipt
- ✅ One Vote Per User Per Election

### 📊 Admin Dashboard
- ✅ Real-time Statistics
- ✅ Live Vote Distribution Charts
- ✅ Voter Management
- ✅ Candidate Management
- ✅ Election Results
- ✅ Settings Panel

### 🎨 Beautiful Design
- ✅ Modern Animated UI
- ✅ Gradient Backgrounds
- ✅ Smooth Transitions & Animations
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Interactive Components
- ✅ Dark Mode Support

## 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Works on all modern browsers

## 🚀 Quick Start

### Method 1: Direct File Opening (Fastest)

1. **Extract the project** to your desired location
2. **Open `index.html`** in your web browser
   - Double-click `index.html`, or
   - Right-click → Open with → Your Browser

### Method 2: Using Local Server (Recommended)

**Windows (PowerShell):**
```powershell
cd path\to\e-voting-system
python -m http.server 8000
```

Then open: `http://localhost:8000`

**macOS/Linux:**
```bash
cd path/to/e-voting-system
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

### Method 3: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## 📖 Usage Guide

### For Voters

1. **Visit Landing Page** (`index.html`)
   - View features and information
   - Click "Get Started"

2. **Create Account** (`register.html`)
   - Fill in your details
   - Create a strong password
   - Accept terms and conditions
   - Click "Create Account"

3. **Email Verification** (`otp-verification.html`)
   - Enter the 6-digit OTP sent to your email
   - Demo OTP: `000000` or check browser console
   - Click "Verify OTP"

4. **Vote** (`voting.html`)
   - Review all candidates
   - Click "Vote" on your preferred candidate
   - Confirm your vote in the dialog
   - View your vote receipt with unique Vote ID

### For Admins

1. **Access Admin Dashboard** (`admin-dashboard.html`)
   - View real-time statistics
   - Monitor voting progress
   - Manage voters and candidates
   - View live results

2. **Dashboard Sections:**
   - **Dashboard**: Overview & Live Charts
   - **Voters**: Voter Management & Status
   - **Candidates**: Manage Candidates
   - **Results**: View Election Results
   - **Settings**: Configure Election

## 🔑 Test Accounts

### Demo Login Credentials:

**Create Your Own Account:**
- Email: any email format
- Password: at least 8 characters
- Click "Create Account"
- Enter OTP: `000000` (or check console)

**Demo OTP:**
- Any 6-digit code or `000000`

## 📂 Project Structure

```
e-voting-system/
├── index.html                 # Landing page
├── login.html                 # Login page
├── register.html              # Registration page
├── otp-verification.html      # OTP verification
├── voting.html                # Voting interface
├── admin-dashboard.html       # Admin panel
├── styles.css                 # All styling & animations
├── script.js                  # Main functionality
├── admin.js                   # Admin panel logic
└── README.md                  # This file
```

## 💾 Data Storage

All data is stored in **browser LocalStorage**:
- `users`: Registered user accounts
- `currentUser`: Currently logged-in user
- `votes`: Vote records
- Automatically synced across browser sessions

**Note:** Clear browser cache to reset all data

## 🎨 Animations & Effects

- **Hero Section**: Animated gradient, floating shapes
- **Fade Animations**: Smooth fade-in effects
- **Card Hover Effects**: Scale and shadow animations
- **Button Interactions**: Transform on hover
- **Progress Bar**: Animated width transition
- **Modal Dialogs**: Smooth slide-in animations
- **OTP Input**: Auto-focus navigation

## 🔒 Security Features

- ✅ Client-side validation
- ✅ Password strength requirements
- ✅ Email format validation
- ✅ OTP verification
- ✅ Session management
- ✅ Vote encryption simulation
- ✅ Unique vote IDs

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+
- ✅ Mobile Browsers

## 📱 Device Support

- ✅ Desktop (1920px and above)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

## 🛠️ Customization

### Change Colors

Edit `styles.css` - Update CSS variables:
```css
:root {
    --primary: #5D3FD3;      /* Purple */
    --secondary: #FF6B6B;    /* Red */
    --success: #2ECC71;      /* Green */
    --danger: #E74C3C;       /* Orange */
}
```

### Add More Candidates

Edit `voting.html` and `script.js`:
1. Add candidate card HTML in `voting.html`
2. Add candidate object in `script.js` appState.candidates

### Customize Messages

Edit text in HTML files and strings in JavaScript files

## 🚀 Deployment

### Deploy to GitHub Pages

1. Create GitHub repository
2. Push project files
3. Go to Settings → Pages
4. Select "main" branch
5. Your site will be live at: `https://yourusername.github.io/e-voting-system`

### Deploy to Netlify

1. Drag and drop folder to Netlify
2. Or connect GitHub repository
3. Site deployed automatically

### Deploy to Vercel

1. Push to GitHub
2. Import project to Vercel
3. Deploy with one click

## 📞 Support

For issues or questions:
1. Check browser console (F12) for error messages
2. Clear browser cache and try again
3. Ensure JavaScript is enabled
4. Try a different browser

## 📝 Demo User Flow

1. **Start**: Open `index.html`
2. **Register**: Click "Get Started" → Fill form
3. **Verify**: Enter OTP (use `000000`)
4. **Vote**: Select candidate → Confirm
5. **Admin**: Open `admin-dashboard.html` to see results

## 🎯 Features Roadmap

- [ ] Real email integration (AWS SES/SendGrid)
- [ ] Database backend (Node.js/Python)
- [ ] Advanced encryption
- [ ] Biometric authentication
- [ ] Mobile app (React Native)
- [ ] Blockchain integration
- [ ] Two-factor authentication
- [ ] Voter analytics

## 📄 License

This project is free to use for personal and educational purposes.

## 🙏 Credits

Created with ❤️ for secure and transparent voting

---

**Happy Voting! 🗳️✨**

For the best experience, open in a modern browser and ensure JavaScript is enabled.

