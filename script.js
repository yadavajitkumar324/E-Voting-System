// Global State
const appState = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    votes: JSON.parse(localStorage.getItem('votes')) || {},
    candidates: {
        alex: { name: 'Alex Johnson', votes: Math.floor(Math.random() * 250) },
        sarah: { name: 'Sarah Williams', votes: Math.floor(Math.random() * 250) },
        michael: { name: 'Michael Chen', votes: Math.floor(Math.random() * 250) },
        emma: { name: 'Emma Rodriguez', votes: Math.floor(Math.random() * 250) }
    }
};

let selectedCandidate = null;
let otpCode = null;

// ============ Initialization ============
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        setupPasswordToggle();
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        setupPasswordToggle();
    }

    // OTP form
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        setupOTPInputs();
        otpForm.addEventListener('submit', handleOTPVerification);
        startOTPTimer();
    }

    // Voting page
    const voteButtons = document.querySelectorAll('.btn-vote');
    if (voteButtons.length > 0) {
        voteButtons.forEach(btn => {
            btn.addEventListener('click', handleVoteClick);
        });
        updateVoteCounts();
        loadCandidateVotes();
    }

    // Setup hero animations
    const words = document.querySelectorAll('.hero-title .word');
    if (words.length > 0) {
        words.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============ Authentication Functions ============
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validation
    if (!email || !password) {
        if (!email) document.getElementById('emailError').textContent = 'Email is required';
        if (!password) document.getElementById('passwordError').textContent = 'Password is required';
        return;
    }

    if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        return;
    }

    // Find user
    const user = appState.users.find(u => u.email === email && u.password === password);

    if (!user) {
        document.getElementById('passwordError').textContent = 'Invalid email or password';
        return;
    }

    // Store current user and redirect to OTP
    appState.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Generate OTP
    otpCode = generateOTP();
    console.log('OTP:', otpCode); // For demo purposes

    alert('OTP sent to your email: ' + otpCode);
    window.location.href = 'otp-verification.html';
}

function handleRegister(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Clear errors
    document.getElementById('regEmailError').textContent = '';
    document.getElementById('passwordMatchError').textContent = '';

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alert('All fields are required');
        return;
    }

    if (!isValidEmail(email)) {
        document.getElementById('regEmailError').textContent = 'Please enter a valid email';
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('passwordMatchError').textContent = 'Passwords do not match';
        return;
    }

    if (!terms) {
        alert('You must agree to the terms and conditions');
        return;
    }

    // Check if user already exists
    if (appState.users.find(u => u.email === email)) {
        document.getElementById('regEmailError').textContent = 'Email already registered';
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        password,
        verified: false,
        voted: false
    };

    appState.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(appState.users));

    // Generate OTP
    otpCode = generateOTP();
    console.log('OTP:', otpCode);

    appState.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert('Account created successfully! OTP: ' + otpCode);
    window.location.href = 'otp-verification.html';
}

// ============ OTP Functions ============
function setupOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const data = e.clipboardData.getData('text');
            data.split('').forEach((char, i) => {
                if (i + index < inputs.length) {
                    inputs[i + index].value = char;
                }
            });
            inputs[Math.min(data.length + index - 1, inputs.length - 1)].focus();
        });
    });
}

function handleOTPVerification(e) {
    e.preventDefault();

    const inputs = document.querySelectorAll('.otp-input');
    const enteredOTP = Array.from(inputs).map(input => input.value).join('');

    if (enteredOTP.length !== 6) {
        alert('Please enter all 6 digits');
        return;
    }

    if (enteredOTP === otpCode || enteredOTP === '000000') { // 000000 for demo
        alert('Email verified successfully!');
        
        // Mark user as verified
        if (appState.currentUser) {
            appState.currentUser.verified = true;
            localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));

            // Update user in users array
            const userIndex = appState.users.findIndex(u => u.id === appState.currentUser.id);
            if (userIndex !== -1) {
                appState.users[userIndex].verified = true;
                localStorage.setItem('users', JSON.stringify(appState.users));
            }
        }

        window.location.href = 'voting.html';
    } else {
        alert('Invalid OTP. Please try again.');
        inputs.forEach(input => input.value = '');
        inputs[0].focus();
    }
}

function startOTPTimer() {
    let timeLeft = 60;
    const timerSpan = document.getElementById('timer');
    const resendBtn = document.getElementById('resendBtn');

    if (!timerSpan) return;

    const interval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(interval);
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend Now';
        }
    }, 1000);

    resendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (timeLeft === 0) {
            otpCode = generateOTP();
            console.log('New OTP:', otpCode);
            alert('New OTP sent: ' + otpCode);
            timeLeft = 60;
            clearInterval(interval);
            startOTPTimer();
        }
    });
}

// ============ Voting Functions ============
function handleVoteClick(e) {
    const btn = e.target;
    selectedCandidate = btn.getAttribute('data-candidate');
    const candidateName = getCandidateName(selectedCandidate);

    document.getElementById('selectedCandidate').textContent = candidateName;
    document.getElementById('confirmModal').classList.add('active');
}

function cancelVote() {
    document.getElementById('confirmModal').classList.remove('active');
    selectedCandidate = null;
}

function submitVote() {
    if (!appState.currentUser) {
        alert('Please log in to vote');
        window.location.href = 'login.html';
        return;
    }

    if (appState.currentUser.voted) {
        alert('You have already voted in this election');
        return;
    }

    // Record vote
    appState.votes[appState.currentUser.id] = selectedCandidate;
    localStorage.setItem('votes', JSON.stringify(appState.votes));

    // Increment candidate votes
    appState.candidates[selectedCandidate].votes++;

    // Mark user as voted
    appState.currentUser.voted = true;
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));

    const userIndex = appState.users.findIndex(u => u.id === appState.currentUser.id);
    if (userIndex !== -1) {
        appState.users[userIndex].voted = true;
        localStorage.setItem('users', JSON.stringify(appState.users));
    }

    // Generate vote ID
    const voteId = 'VOTE-' + Date.now().toString(36).toUpperCase();
    document.getElementById('voteId').textContent = voteId;

    document.getElementById('confirmModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');

    // Update vote counts
    setTimeout(() => {
        updateVoteCounts();
    }, 1000);
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    window.location.href = 'index.html';
}

function getCandidateName(key) {
    const names = {
        alex: 'Alex Johnson',
        sarah: 'Sarah Williams',
        michael: 'Michael Chen',
        emma: 'Emma Rodriguez'
    };
    return names[key] || '';
}

function updateVoteCounts() {
    const totalVotes = Object.values(appState.candidates).reduce((sum, c) => sum + c.votes, 0);
    
    document.getElementById('votesCount').textContent = totalVotes;

    // Update progress bar
    const max = Math.max(...Object.values(appState.candidates).map(c => c.votes));
    const percentage = max > 0 ? (totalVotes / (max * 4)) * 100 : 0;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }

    // Update candidate vote counts
    Object.keys(appState.candidates).forEach(key => {
        const voteCount = appState.candidates[key].votes;
        const card = document.querySelector(`[data-candidate="${key}"]`);
        if (card) {
            card.parentElement.querySelector('.vote-count').textContent = voteCount + ' votes';
        }
    });
}

function loadCandidateVotes() {
    const votingPage = document.querySelector('.voting-container');
    if (!votingPage) return;

    const candidateCards = document.querySelectorAll('.candidate-card');
    candidateCards.forEach(card => {
        const btn = card.querySelector('.btn-vote');
        const candidate = btn.getAttribute('data-candidate');
        const votes = appState.candidates[candidate].votes;
        card.querySelector('.vote-count').textContent = votes + ' votes';
    });
}

// ============ Utility Functions ============
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                btn.textContent = '👁️‍🗨️';
            } else {
                input.type = 'password';
                btn.textContent = '👁️';
            }
        });
    });
}

// ============ Admin Panel Data Sync ============
function getAdminStats() {
    return {
        totalVoters: appState.users.length,
        totalVotes: Object.keys(appState.votes).length,
        votingRate: appState.users.length > 0 ? ((Object.keys(appState.votes).length / appState.users.length) * 100).toFixed(1) : 0
    };
}

// Export for use in admin.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { appState, getAdminStats };
}
