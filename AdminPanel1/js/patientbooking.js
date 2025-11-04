// Load all available tests
let tests = JSON.parse(localStorage.getItem("tests")) || [];

// Get logged-in patient email
let currentPatientEmail = localStorage.getItem("currentPatientEmail");

if (!currentPatientEmail) {
  alert("No patient logged in. Please log in first.");
  window.location.href = "login.html";
} else {
  // Load only this patient's appointments
  let appointments = JSON.parse(localStorage.getItem(`appointments_${currentPatientEmail}`)) || [];

  // Populate dropdown
  let testSelect = document.getElementById("testSelect");
  tests.forEach((t, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${t.name} - ${t.price} Tk`;
    testSelect.appendChild(option);
  });

  // Handle booking form submission
  document.getElementById("appointmentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let testIndex = testSelect.value;
    let date = document.getElementById("appointmentDate").value;

    if (!date) {
      alert("Please select a date.");
      return;
    }

    let selectedTest = tests[testIndex];
    let newAppointment = {
      id: Date.now(),
      testName: selectedTest.name,
      price: parseFloat(selectedTest.price),
      date,
      status: "Pending Payment",
      paidAmount: 0
    };

    appointments.push(newAppointment);
    localStorage.setItem(`appointments_${currentPatientEmail}`, JSON.stringify(appointments));

    alert(`Appointment booked! Please proceed to payment of ${selectedTest.price} Tk.`);
    this.reset();

    // Redirect to payment page
    window.location.href = "payment.html?id=" + newAppointment.id;
  });
}
