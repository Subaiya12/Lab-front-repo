// Load patients and tests
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];

const adminAppointmentList = document.getElementById("adminAppointmentList");

// Collect all appointments from all patients
function getAllAppointments() {
  let allAppointments = [];
  patients.forEach(p => {
    let patientAppointments = JSON.parse(localStorage.getItem(`appointments_${p.email}`)) || [];
    // Add patient email to each appointment
    patientAppointments.forEach(app => app.patientEmail = p.email);
    allAppointments = allAppointments.concat(patientAppointments);
  });
  return allAppointments;
}

// Render all appointments
function renderAdminAppointments() {
  const appointments = getAllAppointments();
  adminAppointmentList.innerHTML = "";

  if (appointments.length === 0) {
    adminAppointmentList.innerHTML += `<tr><td colspan="6" style="text-align:center; color:gray;">No appointments yet</td></tr>`;
    return;
  }

  appointments.forEach(app => {
    const patient = patients.find(p => p.email === app.patientEmail);
    const test = tests.find(t => t.name === app.testName);

    // Status options
    const statusOptions = ["Pending Payment", "Partially Paid", "Pending Confirmation", "Confirmed"];
    let statusSelect = `<select onchange="updateStatus('${app.patientEmail}', ${app.id}, this.value)">`;
    statusOptions.forEach(status => {
      statusSelect += `<option value="${status}" ${app.status === status ? "selected" : ""}>${status}</option>`;
    });
    statusSelect += "</select>";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${patient ? patient.name : "Unknown"}</td>
      <td>${app.testName || (test ? test.name : "Unknown")}</td>
      <td>${app.date}</td>
      <td>${app.paidAmount || 0} / ${app.price || (test ? test.price : 0)} Tk</td>
      <td>${statusSelect}</td>
      <td>
        <button onclick="deleteAppointment('${app.patientEmail}', ${app.id})" style="background:#e74c3c;">Delete</button>
      </td>
    `;
    adminAppointmentList.appendChild(row);
  });
}

// Update status
function updateStatus(patientEmail, id, newStatus) {
  let appointments = JSON.parse(localStorage.getItem(`appointments_${patientEmail}`)) || [];
  const app = appointments.find(a => a.id === id);
  if (app) {
    app.status = newStatus;
    localStorage.setItem(`appointments_${patientEmail}`, JSON.stringify(appointments));
    renderAdminAppointments();
  }
}

// Delete appointment
function deleteAppointment(patientEmail, id) {
  if (confirm("Are you sure you want to delete this appointment?")) {
    let appointments = JSON.parse(localStorage.getItem(`appointments_${patientEmail}`)) || [];
    appointments = appointments.filter(a => a.id !== id);
    localStorage.setItem(`appointments_${patientEmail}`, JSON.stringify(appointments));
    renderAdminAppointments();
  }
}

// Initial render
renderAdminAppointments();
