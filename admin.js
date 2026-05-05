// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});

// Global app state (imported from script.js)
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

function initializeAdmin() {
    setupSidebarNavigation();
    updateDashboard();
    setupAutoRefresh();
}

function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('logout')) {
                return; // Allow logout
            }

            e.preventDefault();

            const section = link.getAttribute('data-section');
            if (!section) return;

            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update page title
            const titles = {
                dashboard: 'Dashboard',
                voters: 'Registered Voters',
                candidates: 'Candidates',
                results: 'Election Results',
                settings: 'Settings'
            };

            document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';

            // Show/hide sections
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.style.display = 'none';
            });

            const targetSection = document.getElementById(`${section}-section`);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Animate in
                targetSection.style.animation = 'none';
                setTimeout(() => {
                    targetSection.style.animation = 'fadeInUp 0.5s ease-out';
                }, 10);
            }
        });
    });

    // Set dashboard as active by default
    document.querySelector('[data-section="dashboard"]').classList.add('active');
}

function updateDashboard() {
    const stats = getAdminStats();

    // Update stat cards
    document.getElementById('totalVoters').textContent = stats.totalVoters;
    document.getElementById('totalVotes').textContent = stats.totalVotes;
    document.getElementById('votingRate').textContent = stats.votingRate + '%';

    // Update vote counts from local state
    updateVoteCharts();
    updateVotersTable();
}

function updateVoteCharts() {
    // Read votes from localStorage
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    
    const candidateVotes = {
        alex: 0,
        sarah: 0,
        michael: 0,
        emma: 0
    };

    // Count votes
    Object.values(votes).forEach(vote => {
        if (candidateVotes.hasOwnProperty(vote)) {
            candidateVotes[vote]++;
        }
    });

    // Update chart bars with animation
    const totalVotes = Object.values(candidateVotes).reduce((a, b) => a + b, 0);
    const maxVotes = Math.max(...Object.values(candidateVotes), 1);

    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const candidates = ['alex', 'sarah', 'michael', 'emma'];
        const candidate = candidates[index];
        const count = candidateVotes[candidate];
        const percentage = (count / maxVotes) * 100;

        const barFill = bar.querySelector('.bar-fill');
        const barValue = bar.querySelector('.bar-value');

        if (barFill) {
            barFill.style.width = percentage + '%';
        }
        if (barValue) {
            barValue.textContent = count + ' votes';
        }

        // Update vote IDs for results section
        const resultVotes = document.getElementById(`result-votes-${index + 1}`);
        if (resultVotes) {
            resultVotes.textContent = count + ' votes';
        }
    });
}

function updateVotersTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const votersTable = document.getElementById('votersTable');

    if (!votersTable) return;

    // Clear existing rows
    votersTable.innerHTML = '';

    // Add user rows
    users.forEach((user, index) => {
        const status = votes[user.id] ? 'Voted' : (user.verified ? 'Verified' : 'Pending');
        const badgeClass = votes[user.id] ? 'badge-voted' : (user.verified ? 'badge-verified' : '');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${String(index + 1).padStart(3, '0')}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td><span class="badge ${badgeClass}">${status}</span></td>
            <td><button class="btn btn-small" onclick="viewVoter(${user.id})">View</button></td>
        `;
        votersTable.appendChild(row);
    });

    if (users.length === 0) {
        votersTable.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No voters registered yet</td></tr>';
    }
}

function setupAutoRefresh() {
    // Auto-refresh dashboard every 5 seconds
    setInterval(() => {
        const dashboardSection = document.getElementById('dashboard-section');
        if (dashboardSection && dashboardSection.style.display !== 'none') {
            updateDashboard();
        }
    }, 5000);
}

function getAdminStats() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};

    return {
        totalVoters: users.length,
        totalVotes: Object.keys(votes).length,
        votingRate: users.length > 0 ? ((Object.keys(votes).length / users.length) * 100).toFixed(1) : 0
    };
}

function viewVoter(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};

    const user = users.find(u => u.id === userId);
    if (user) {
        const voted = votes[userId] ? 'Yes' : 'No';
        alert(`
Voter Details:
Name: ${user.firstName} ${user.lastName}
Email: ${user.email}
Phone: ${user.phone}
Verified: ${user.verified ? 'Yes' : 'No'}
Voted: ${voted}
        `);
    }
}

// Add event listeners for settings form
document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        const submitBtn = settingsForm.querySelector('button[type="submit"]');
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Settings saved successfully!');
        });
    }
});
