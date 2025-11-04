// Get logged-in patient email
let currentPatientEmail = localStorage.getItem("currentPatientEmail");

if (!currentPatientEmail) {
  alert("No patient logged in. Please log in first.");
  window.location.href = "login.html";
} else {
  // Load only this patient's appointments
  let appointments = JSON.parse(localStorage.getItem(`appointments_${currentPatientEmail}`)) || [];

  function displayAppointments() {
    let table = document.getElementById("myAppointments");
    table.innerHTML = "<tr><th>Test</th><th>Date</th><th>Paid</th><th>Status</th><th>Action</th></tr>";

    if (appointments.length === 0) {
      table.innerHTML += `<tr><td colspan="5" style="text-align:center; color:gray;">No appointments yet</td></tr>`;
      return;
    }

    appointments.forEach(app => {
      table.innerHTML += `
        <tr>
          <td>${app.testName}</td>
          <td>${app.date}</td>
          <td>${app.paidAmount} / ${app.price} Tk</td>
          <td>${app.status}</td>
          <td>
            ${app.status === "Pending Payment" || app.status === "Partially Paid"
              ? `<button onclick="payAgain(${app.id})">Pay Now</button>`
              : "—"}
          </td>
        </tr>
      `;
    });
  }

  function payAgain(id) {
    window.location.href = "payment.html?id=" + id;
  }

  // Initial display
  displayAppointments();
}
