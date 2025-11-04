document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const msg = document.getElementById("message");

  if (user === "admin" && pass === "1234")  {   
    msg.textContent = "Login successful!";
    msg.className = "message success";
    msg.style.display = "block";
    setTimeout(() => window.location.href = "admindashboard.html", 1000);
  } else {
    msg.textContent = "Invalid password";
    msg.className = "message error";
    msg.style.display = "block";
  }
});
