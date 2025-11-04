// Get logged-in staff
const staff = JSON.parse(localStorage.getItem('loggedInStaff'));

// Redirect if not logged in
if (!staff) {
  alert('Please login first!');
  window.location.href = 'stafflogin.html';
}

// Update welcome message
document.getElementById('welcomeMessage').textContent = `Welcome, ${staff.username}!`;

// Update cards with staff-specific stats
const cards = document.querySelectorAll('.card');
cards[0].innerHTML = `Patients Today: <span>${staff.patientsToday || 0}</span>`;
cards[1].innerHTML = `Pending Reports: <span>${staff.pendingReports || 0}</span>`;
cards[2].innerHTML = `Completed Tests: <span>${staff.completedTests || 0}</span>`;
cards[3].innerHTML = `Revenue: <span>$${staff.revenue || 0}</span>`;

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('loggedInStaff');
  window.location.href = 'stafflogin.html';
});
