const app = document.getElementById("app");
let inputValue = document.getElementById("input");
const btn = document.getElementById("btn");
const btnDelete = document.getElementById("btnDelete");
const list = document.getElementById("list");

let inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btnSearch");
let students = [];
// Browserga chiqarish
// method: GET
function getStudents() {
  var render = "";
  students.map((student, index) => {
    render += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>

            <td style="display: flex; justify-content: space-evenly"><button id="btnDelete" onclick={deleteStudent(${
              student.id
            })}>Delete</button>
            <button onclick={editStudents(${student.id})}>Edit</button></td>
        </tr>
    `;
  });
  app.innerHTML = render;
  list.innerHTML =
    students.length > 0 ? students.length : "No students in list";
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
function editStudents(ids) {
  students.map((value) => {
    if (value.id === ids) {
      console.log(value.id, ids);
      inputValue.value += value.name;
      
    }
    // if (addStudent()) {
    //   value.name = inputValue.value;
    // }
  });
}

getStudents();
