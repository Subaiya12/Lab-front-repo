// Switch forms
const loginForm = document.getElementById("patientLoginForm");
const registerForm = document.getElementById("patientRegisterForm");

document.getElementById("showRegister").addEventListener("click", e => {
  e.preventDefault();
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
});

document.getElementById("showLogin").addEventListener("click", e => {
  e.preventDefault();
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Patient registration
registerForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("newName").value;
  const age = document.getElementById("newAge").value;
  const gender = document.getElementById("newGender").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  if (patients.some(p => p.email === email)) {
    document.getElementById("registerMessage").textContent = "Email already registered!";
    return;
  }

  patients.push({ name, age, gender, email, password });
  localStorage.setItem("patients", JSON.stringify(patients));
  document.getElementById("registerMessage").textContent = "Registration successful! Please login.";
  registerForm.reset();
});

// Patient login
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("patientEmail").value;
  const password = document.getElementById("patientPassword").value;
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients.find(p => p.email === email && p.password === password);

  if (patient) {
  // store current patient object
  localStorage.setItem("currentPatient", JSON.stringify(patient));

  // store email separately for appointments filtering
  localStorage.setItem("currentPatientEmail", patient.email);

  // redirect after short delay
  setTimeout(() => {
    window.location.href = "patient-landing.html";
  }, 1000);
} else {
  document.getElementById("loginMessage").textContent = "Invalid email or password!";
}

});
