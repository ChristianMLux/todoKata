/**
 * GLOBAL VARIABLES
 */
const todos = [];
let todoList = document.querySelector("#todoList");
let addTodoBtn = document.querySelector("#addTodoBtn");

/** ADD TODO */
function addTodo() {
  // get the todo out of the textfield
  let todoEntry = document.getElementById("addTodoTf").value;
  // list-entry
  const newTodo = document.createElement("li");
  newTodo.innerText = todoEntry;
  // add to list
  todoList.appendChild(newTodo);
  //clear text input
  document.getElementById("addTodoTf").value = "";
}

/** TODO BTN LISTENER */
if (addTodoBtn) {
  addTodoBtn.addEventListener("click", addTodo);
} else {
  console.log("Sorry, can't find addTodoBtn");
}
