/**
 * GLOBAL VARIABLES
 */
const todos = [];
const storageKey = "todos";
let todoList = document.querySelector("#todoList");
let addTodoBtn = document.querySelector("#addTodoBtn");
let currentTodo = undefined;
let todoEntry = null;
let index = 0;

/** ADD TODO */
function addTodo() {
  // get the todo out of the textfield
  todoEntry = document.getElementById("addTodoTf").value;
  // list-entry
  const checkBox = document.createElement("INPUT");
  const checkBoxLabel = document.createElement("label");
  const newTodo = document.createElement("li");

  checkBox.type = "checkbox";
  checkBox.className = "todo-check-box";
  checkBox.id = "todoCheckbox" + index;
  checkBoxLabel.for = "todoCheckbox";
  checkBoxLabel.className = "todo-name";
  newTodo.id = "todo" + index++;

  newTodo.innerText = todoEntry;

  // add to list
  newTodo.appendChild(checkBox);
  newTodo.appendChild(checkBoxLabel);

  todoList.appendChild(newTodo);

  // add todo to array
  todos.push(todoEntry);

  // save to local storage
  //saveTodoInLocal();
  checkBox.addEventListener("click", setCheckedState);

  // clear text input
  document.getElementById("addTodoTf").value = "";
}

function conEntryOutput() {
  console.log("index " + index);
  let i = index - 1;
  console.log("i " + i);
  let checkBox = document.getElementById("todoCheckbox" + i);
  if (checkBox.checked === true) {
    console.log(checkBox);
    i++;
    console.log("iafter " + i);
  }
}

function getCheckedState() {
  let i = index - 1;
  let entryID = "todoCheckbox" + i;
  todoEntry = document.getElementById("todo" + i);
  let checkBox = document.getElementById(entryID);
  console.log("todoID = " + todoEntry);
  if (checkBox.checked === true) {
    //todoEntry.style.textDecoration = "line-through";
    console.log("checked");
    return true;
  } else {
    console.log("not checked");
  }
}

function setCheckedState() {
  if (getCheckedState(true)) {
    todoEntry.style.textDecoration = "line-through";
  }
}

function getTodoID() {}

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
