// Function to redirect based on selected role
function goToLogin(role) {
  switch(role) {
    case 'patient':
      window.location.href = "patientlogin.html"; // Patient login page
      break;
    case 'staff':
      window.location.href = "stafflogin.html"; // Staff login page
      break;
    case 'admin':
      window.location.href = "adminlogin.html"; // Admin login page
      break;
    default:
      alert("Invalid role selected!");
  }
}
