// Get logged-in patient
let currentPatientEmail = localStorage.getItem("currentPatientEmail");
if (!currentPatientEmail) {
  alert("No patient logged in. Please log in first.");
  window.location.href = "login.html";
}

// Get appointment ID from URL (from booking redirect)
const urlParams = new URLSearchParams(window.location.search);
const appointmentId = parseInt(urlParams.get("id"));

// Load only this patient's appointments
let appointments = JSON.parse(localStorage.getItem(`appointments_${currentPatientEmail}`)) || [];

// Find the booked appointment
let appointment = appointments.find(a => a.id === appointmentId);

if (!appointment) {
  document.getElementById("paymentInfo").textContent = "Appointment not found!";
} else {
  // Display appointment info
  document.getElementById("testName").textContent = appointment.testName;
  document.getElementById("appointmentDate").textContent = appointment.date;
  document.getElementById("amountToPay").textContent = (appointment.price - appointment.paidAmount).toFixed(2) + " Tk";

  // Handle payment
  document.getElementById("paymentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let payAmount = parseFloat(document.getElementById("payAmount").value);
    let remaining = appointment.price - appointment.paidAmount;

    if (isNaN(payAmount) || payAmount <= 0 || payAmount > remaining) {
      alert(`Invalid amount! You can pay up to ${remaining} Tk`);
      return;
    }

    appointment.paidAmount += payAmount;

    // Update status
    if (appointment.paidAmount >= appointment.price) {
      appointment.status = "Paid";
      appointment.paidAmount = appointment.price; // avoid rounding issues
    } else {
      appointment.status = "Partially Paid";
    }

    // Save updated appointment back to localStorage
    localStorage.setItem(`appointments_${currentPatientEmail}`, JSON.stringify(appointments));

    alert(`Payment successful! Paid: ${payAmount} Tk`);
    window.location.href = "patient-landing.html"; // redirect to appointments page
  });
}
