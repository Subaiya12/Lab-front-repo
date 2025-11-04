// Check if patient is logged in
const patient = JSON.parse(localStorage.getItem("currentPatient"));

if (!patient) {
  alert("Please login first!");
  window.location.href = "patientlogin.html"; // redirect to login
} else {
  document.getElementById("patientName").innerText = patient.name;
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentPatient");
  window.location.href = "patientlogin.html"; // back to login
});
