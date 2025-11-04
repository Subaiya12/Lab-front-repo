// Test.js

let tests = JSON.parse(localStorage.getItem("tests")) || [];
let testId = tests.length > 0 ? tests[tests.length - 1].id + 1 : 1;
let editId = null;

document.getElementById("addTestForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("testName").value;
  let desc = document.getElementById("testDesc").value;
  let price = document.getElementById("testPrice").value;

  if (editId === null) {
    // Add new test
    let newTest = { id: testId++, name, desc, price };
    tests.push(newTest);
  } else {
    // Update test
    let test = tests.find(t => t.id === editId);
    test.name = name;
    test.desc = desc;
    test.price = price;
    editId = null;
    document.getElementById("formTitle").textContent = "Add New Test";
    document.getElementById("submitBtn").textContent = "Add Test";
  }

  saveTests();
  displayTests();
  this.reset();
});

function displayTests() {
  let list = document.getElementById("testList");
  list.innerHTML = "";

  tests.forEach(test => {
    let row = `
      <tr>
        <td>${test.name}</td>
        <td>${test.desc}</td>
        <td>${test.price}</td>
        <td>
          <button class="edit-btn" onclick="editTest(${test.id})">Edit</button>
          <button class="delete-btn" onclick="deleteTest(${test.id})">Delete</button>
        </td>
      </tr>
    `;
    list.innerHTML += row;
  });
}

function editTest(id) {
  let test = tests.find(t => t.id === id);
  document.getElementById("testName").value = test.name;
  document.getElementById("testDesc").value = test.desc;
  document.getElementById("testPrice").value = test.price;

  editId = id;
  document.getElementById("formTitle").textContent = "Edit Test";
  document.getElementById("submitBtn").textContent = "Update Test";
}

function deleteTest(id) {
  tests = tests.filter(t => t.id !== id);
  saveTests();
  displayTests();
}

function saveTests() {
  localStorage.setItem("tests", JSON.stringify(tests));
}

// Load on page start
displayTests();
