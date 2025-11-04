// Get DOM elements
const loginForm = document.getElementById('staffLoginForm');
const registerForm = document.getElementById('staffRegisterForm');
const formTitle = document.getElementById('formTitle');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const testsDropdown = document.getElementById('testsDropdown');
const dropdownSelected = testsDropdown.querySelector('.dropdown-selected');
const checkboxes = testsDropdown.querySelectorAll('input[type="checkbox"]');

// Switch to registration form
showRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
  formTitle.textContent = 'Staff Panel - Register';
});

// Switch to login form
showLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.remove('active');
  loginForm.classList.add('active');
  formTitle.textContent = 'Staff Panel - Login';
});

// Custom dropdown toggle
dropdownSelected.addEventListener('click', (e) => {
  e.stopPropagation();
  testsDropdown.classList.toggle('active');
});

// Prevent dropdown from closing when clicking inside options
testsDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!testsDropdown.contains(e.target)) {
    testsDropdown.classList.remove('active');
  }
});

// Update dropdown display text based on selections
function updateDropdownText() {
  const selected = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  
  if (selected.length === 0) {
    dropdownSelected.textContent = 'Select Tests';
  } else if (selected.length === 1) {
    dropdownSelected.textContent = selected[0];
  } else {
    dropdownSelected.textContent = `${selected.length} tests selected`;
  }
}

// Add change listeners to checkboxes
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateDropdownText);
});

// Handle registration form submission
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newUser = document.getElementById('newUsername').value.trim();
  const newEmail = document.getElementById('newEmail').value.trim();
  const newPass = document.getElementById('newPassword').value.trim();
  const qualification = document.getElementById('qualification').value;
  const experience = document.getElementById('experience').value;
  
  // Collect selected tests from checkboxes
  const selectedTests = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  if (!qualification) {
    alert('Please select your qualification');
    return;
  }

  if (selectedTests.length === 0) {
    alert('Please select at least one test you are qualified to conduct');
    return;
  }

  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  
  // Check if username already exists
  if (staffList.some(s => s.username === newUser)) {
    alert('Username already exists. Please choose another.');
    return;
  }

  const newStaff = {
    username: newUser,
    email: newEmail,
    password: newPass,
    qualification: qualification,
    tests: selectedTests,
    experience: experience,
    approved: false // Admin must approve
  };
  
  staffList.push(newStaff);
  localStorage.setItem('staffList', JSON.stringify(staffList));

  alert('Registration successful! Please wait for admin approval.');
  registerForm.reset();
  
  // Reset dropdown display
  checkboxes.forEach(cb => cb.checked = false);
  updateDropdownText();
  
  showLoginBtn.click();
});

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('staffUsername').value.trim();
  const password = document.getElementById('staffPassword').value.trim();

  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  const staff = staffList.find(s => s.username === username && s.password === password);

  if (staff) {
    if (staff.approved) {
      alert('Login successful! Redirecting...');
      localStorage.setItem('loggedInStaff', username);
      window.location.href = 'staffdash.html';
    } else {
      alert('Your account is pending admin approval. Please wait.');
    }
  } else {
    alert('Invalid Username or Password');
  }
});