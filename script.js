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
  const newTodo = document.createElement("li");
  newTodo.innerText = todoEntry;
  // add to list
  todoList.appendChild(newTodo);
  // add todo to array
  todos.push(todoEntry);
  // save to local storage
  saveTodoInLocal();
  // clear text input
  document.getElementById("addTodoTf").value = "";
}

/** TODO BTN LISTENER */
if (addTodoBtn) {
  addTodoBtn.addEventListener("click", addTodo);
} else {
  console.log("Sorry, can't find addTodoBtn");
}

/** SAVE TODO in local storage */
function saveTodoInLocal() {
  const jsonTodo = JSON.stringify(todos);
  localStorage.setItem(storageKey, jsonTodo);
}
/** READ TODO LIST from local storage */
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
/** INITIAL TODO LOADING */
readTodoInLocal();
