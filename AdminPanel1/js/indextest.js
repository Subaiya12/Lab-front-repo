// Load tests from localStorage (added by admin)
function loadTests() {
  const tests = JSON.parse(localStorage.getItem("tests")) || [];
  const grid = document.getElementById("testGrid");
  grid.innerHTML = "";

  if (tests.length === 0) {
    grid.innerHTML = `<p style="text-align:center; color:gray;">No tests available yet.</p>`;
    return;
  }

  tests.forEach(test => {
    const card = document.createElement("div");
    card.classList.add("test-card");
    card.innerHTML = `
      <h3>${test.name}</h3>
      <p>${test.desc}</p>
      <span class="price">${test.price}</span>
    `;
    grid.appendChild(card);
  });
}

// Initial load
loadTests();
