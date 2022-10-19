const app = document.getElementById("app");
let inputValue = document.getElementById("input");
const btn = document.getElementById("btn");
const btnDelete = document.getElementById("btnDelete");
const list = document.getElementById("list");
const updateBtn = document.getElementById("update");
var selectedRow = null;
let inputSearch = document.getElementById("inputSearch");
let students = [];
// Browserga chiqarish
// method: GET
function getStudents() {
  var render = "";
  students.map((student, index) => {
    render += `
        <div style="display:flex; margin: 10px" class="card">
            <div class="items card-body index">${index + 1}</div>
            <p class="items card-body name">${student.name}</p>

            <div class="card-body" style="display: flex; justify-content: space-evenly"><button style=" margin-right: 10px;" id="btnDelete" onclick={deleteStudent(${
              student.id
            })}>Delete</button>
            <button id="edit" onClick="onEdit(this)">Edit</button></div>
        </div>
    `;
  });
  app.innerHTML = render;
  list.innerHTML =
    students.length > 0 ? students.length : "No students in list";
  app.childElementCount > 0
    ? (inputSearch.style.display = "block")
    : (inputSearch.style.display = "none");
}

// Add new student
// method: POST
function addStudent() {
  return new Promise((resolve, reject) => {
    let newStudent = { id: students.length + 1, name: inputValue.value };
    students = [...students, newStudent];
    inputValue.value = "";
    resolve();
  });
}
btn.addEventListener("click", async () => {
  await addStudent();
  getStudents();
});

// Delete student
// method: DELETE
function deleteStudent(id) {
  let updatedList = students.filter((value) => value.id !== id);
  students = updatedList;
  getStudents();
}

// Edit student(s)
// method: PATCH
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  inputValue.value = selectedRow.children[1].innerHTML;
  console.log(selectedRow.children[1].innerHTML);
  btn.style.display = "none";
  update.style.display = "block";
}

  update.addEventListener("click", () => {
    selectedRow.children[1].textContent = inputValue.value;
  });

// Search students
inputSearch.addEventListener("input", () => {
  const filter = inputSearch.value.toLowerCase();
  const listItems = document.querySelectorAll(".items");

  listItems.forEach((item) => {
    let text = item.textContent;
    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.parentElement.style.display = "";
    } else {
      item.parentElement.style.display = "none";
    }
  });
});

getStudents();
