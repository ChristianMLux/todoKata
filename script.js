/**
 * GLOBAL VARIABLES
 */
const todos = [];
const storageKey = "todos";
let todoList = document.querySelector("#todoList");
let addTodoBtn = document.querySelector("#addTodoBtn");
let currentTodo = undefined;

/** ADD TODO */
function addTodo() {
  // get the todo out of the textfield
  let todoEntry = document.getElementById("addTodoTf").value;

  // list-entry
  const checkBox = document.createElement("INPUT");
  const checkBoxLabel = document.createElement("label");
  const newTodo = document.createElement("li");

  checkBox.type = "checkbox";
  checkBox.className = "todo-check-box";
  checkBox.id = "todoCheckbox";
  checkBoxLabel.for = "todoCheckbox";
  checkBoxLabel.className = "todo-name";

  newTodo.innerText = todoEntry;

  // add to list
  newTodo.appendChild(checkBox);
  newTodo.appendChild(checkBoxLabel);

  todoList.appendChild(newTodo);

  // add todo to array
  todos.push(todoEntry);

  // done btn
  const doneCb = document.createElement("INPUT");
  doneCb.setAttribute("type", "checkbox");
  doneCb.setAttribute("class", "done-cb");

  // save to local storage
  //saveTodoInLocal();

  // clear text input
  document.getElementById("addTodoTf").value = "";
}

/** DONE TODO */
function setTodoDone() {}

/** TODO BTN LISTENER */
if (addTodoBtn) {
  addTodoBtn.addEventListener("click", addTodo);
} else {
  console.log("Sorry, can't find addTodoBtn");
}

/** SAVE TODO in local storage 
function saveTodoInLocal() {
  const jsonTodo = JSON.stringify(todos);
  localStorage.setItem(storageKey, jsonTodo);
}
/** READ TODO LIST from local storage 
function readTodoInLocal() {
  const storageTodos = localStorage.getItem(storageKey);
  if (storageTodos !== null) {
    const jtodo = JSON.parse(storageTodos);
    jtodo.forEach((todo) => {
      addTodo(todo);
      todos.push(todo);
    });
  }
}
/** INITIAL TODO LOADING
readTodoInLocal();
 */
