// Get DOM elements
const staffListBody = document.getElementById('staffList');
const filterTabs = document.querySelectorAll('.tab-btn');
const modal = document.getElementById('staffModal');
const closeModal = document.querySelector('.close');
const staffDetails = document.getElementById('staffDetails');

let currentFilter = 'all';

// Load and display staff
function loadStaff() {
  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  staffListBody.innerHTML = '';

  if (staffList.length === 0) {
    staffListBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">No staff members found</td></tr>';
    return;
  }

  staffList.forEach((staff, index) => {
    const row = document.createElement('tr');
    
    // Apply filter
    if (currentFilter === 'pending' && staff.approved) {
      row.classList.add('hidden');
    } else if (currentFilter === 'approved' && !staff.approved) {
      row.classList.add('hidden');
    }

    // Create tests display
    const testsDisplay = staff.tests && staff.tests.length > 0
      ? staff.tests.map(test => `<span class="tests-tag">${test}</span>`).join(' ')
      : '<span style="color: #999;">No tests specified</span>';

    // Create status badge
    const statusBadge = staff.approved
      ? '<span class="status-badge approved">Approved</span>'
      : '<span class="status-badge pending">Pending</span>';

    // Create action buttons
    let actionButtons = `
      <div class="action-buttons">
        <button class="btn btn-view" onclick="viewStaff(${index})">View</button>
    `;

    if (!staff.approved) {
      actionButtons += `
        <button class="btn btn-approve" onclick="approveStaff(${index})">Approve</button>
        <button class="btn btn-reject" onclick="rejectStaff(${index})">Reject</button>
      `;
    } else {
      actionButtons += `
        <button class="btn btn-delete" onclick="deleteStaff(${index})">Remove</button>
      `;
    }

    actionButtons += `</div>`;

    row.innerHTML = `
      <td>${staff.username}</td>
      <td>${staff.email}</td>
      <td>${staff.qualification || 'N/A'}</td>
      <td>${staff.experience ? staff.experience + ' years' : 'N/A'}</td>
      <td>${testsDisplay}</td>
      <td>${statusBadge}</td>
      <td>${actionButtons}</td>
    `;

    staffListBody.appendChild(row);
  });
}

// View staff details
function viewStaff(index) {
  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  const staff = staffList[index];

  if (!staff) return;

  const testsDisplay = staff.tests && staff.tests.length > 0
    ? staff.tests.join(', ')
    : 'No tests specified';

  staffDetails.innerHTML = `
    <div class="detail-row">
      <div class="detail-label">Username:</div>
      <div class="detail-value">${staff.username}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Email:</div>
      <div class="detail-value">${staff.email}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Qualification:</div>
      <div class="detail-value">${staff.qualification || 'N/A'}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Years of Experience:</div>
      <div class="detail-value">${staff.experience || 'N/A'}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Tests Qualified:</div>
      <div class="detail-value">${testsDisplay}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Status:</div>
      <div class="detail-value">${staff.approved ? 'Approved' : 'Pending Approval'}</div>
    </div>
  `;

  modal.style.display = 'block';
}

// Approve staff
function approveStaff(index) {
  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  
  if (confirm(`Are you sure you want to approve ${staffList[index].username}?`)) {
    staffList[index].approved = true;
    localStorage.setItem('staffList', JSON.stringify(staffList));
    alert('Staff member approved successfully!');
    loadStaff();
  }
}

// Reject staff (delete)
function rejectStaff(index) {
  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  
  if (confirm(`Are you sure you want to reject ${staffList[index].username}? This will delete their account.`)) {
    staffList.splice(index, 1);
    localStorage.setItem('staffList', JSON.stringify(staffList));
    alert('Staff member rejected and removed.');
    loadStaff();
  }
}

// Delete staff
function deleteStaff(index) {
  const staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  
  if (confirm(`Are you sure you want to remove ${staffList[index].username}? This action cannot be undone.`)) {
    staffList.splice(index, 1);
    localStorage.setItem('staffList', JSON.stringify(staffList));
    alert('Staff member removed successfully.');
    loadStaff();
  }
}

// Filter tabs
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.getAttribute('data-filter');
    loadStaff();
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Initial load
loadStaff();