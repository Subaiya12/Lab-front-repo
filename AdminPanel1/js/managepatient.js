// Load patients from localStorage
let patients = JSON.parse(localStorage.getItem("patients")) || [];

// Display patients in the table
function displayPatients() {
  let table = document.getElementById("patientList");
  table.innerHTML = "";

  if (patients.length === 0) {
    table.innerHTML = `<tr><td colspan="4" style="text-align:center; color:gray;">No patients registered yet</td></tr>`;
    return;
  }

  patients.forEach((p) => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.gender}</td>
        <td>${p.email}</td>
      </tr>
    `;
  });
}

// Run on page load
displayPatients();
