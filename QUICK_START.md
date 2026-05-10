# SecureVote - Beginner Quick Start

This guide is written in simple English so anyone can understand which files belong to the frontend and which files belong to the backend.

## 1) Simple project structure

### Frontend folder
Put these files in `frontend/`:

- `index.html`
- `login.html`
- `register.html`
- `otp-verification.html`
- `voting.html`
- `admin-dashboard.html`
- `styles.css`
- `script.js`
- `admin.js`
- `frontend/package.json`
- `frontend/.env`
- `frontend/public/index.html`
- `frontend/src/index.js`
- `frontend/src/App.js`
- `frontend/src/components/Notification.js`
- `frontend/src/pages/AdminDashboard.js`
- `frontend/src/pages/HomePage.js`
- `frontend/src/pages/LoginPage.js`
- `frontend/src/pages/RegisterPage.js`
- `frontend/src/pages/VotingPage.js`
- `frontend/src/styles/AdminDashboard.css`
- `frontend/src/styles/App.css`
- `frontend/src/styles/AuthPages.css`
- `frontend/src/styles/HomePage.css`
- `frontend/src/styles/index.css`
- `frontend/src/styles/Notification.css`
- `frontend/src/styles/VotingPage.css`
- `frontend/src/utils/api.js`

### Backend folder
Put these files in `backend/`:

- `backend/package.json`
- `backend/.env`
- `backend/server.js`
- `backend/routes/auth.js`
- `backend/routes/votes.js`
- `backend/routes/admin.js`

### Project root
Keep these files in the main project folder:

- `README.md`
- `SETUP.md`
- `QUICK_START.md`
- `QUICKSTART.md`
- `IMAGE_SETUP.md`
- `package-lock.json`

## 2) Files that may look duplicate

These files have different names, but they are related documentation files. Read each one only once:

- `QUICK_START.md`
- `QUICKSTART.md`
- `README.md`
- `SETUP.md`
- `IMAGE_SETUP.md`

## 3) File to ignore

- `.gitignore`

## 4) How to run the project

### Run the backend

```powershell
cd backend
npm start
```

The backend usually runs at `http://localhost:5000`.

### Run the frontend

```powershell
cd frontend
npm start
```

The frontend usually runs at `http://localhost:3000`.

### Open the static HTML version

If you do not want to run React, you can open the root HTML files directly:

- `index.html`
- `login.html`
- `register.html`
- `otp-verification.html`
- `voting.html`
- `admin-dashboard.html`

## 5) What a beginner should do

1. Open `index.html` first
2. Create an account using `register.html`
3. Verify the OTP
4. Vote in `voting.html`
5. Open `admin-dashboard.html` for the admin view

## 6) Easy rule to remember

- Browser-side files = frontend
- Server-side files = backend
- Do not include `.gitignore` in the file map
- Do not repeat the same file twice

If you want, I can also rewrite the main `README.md` in the same simple English style.

