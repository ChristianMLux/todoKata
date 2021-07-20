/**
 * GLOBAL VARIABLES
 */
let todos = [];
const storageKey = "todos";
const todoList = document.querySelector("#todoList");
const newTodoEntry = document.getElementById("addTodoTf");
const addTodoBtn = document.querySelector("#addTodoBtn");
let index = 0;
let todoEntry = null;

/** TODO CLASS CONSTRUCTOR */
class Todo {
  constructor(todoID, descriptionParameter) {
    this.todoID = todoID;
    this.description = descriptionParameter;
    this.done = false;
  }
}

/** TODO BTN LISTENER */
if (addTodoBtn) {
  addTodoBtn.addEventListener("click", addTodo);
} else {
  console.log("Sorry, can't find addTodoBtn");
}
/** TEXTFIELD ENTER BTN LISTENER */
newTodoEntry.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTodoBtn.click();
  }
});
newTodoEntry;

/** TODO ADD FUNCTION */
function addTodo() {
  let newTodoValue = "";
  let todoID = "";

  if (newTodoEntry.value.length >= 5) {
    newTodoValue = newTodoEntry.value;
    todoID = setID("todo", index++);
    let newTodo = new Todo(todoID, newTodoValue);

    todos.push(newTodo);

    renderList(newTodoValue, todoID, newTodo);
  } else {
    console.log("sorry, please enter at least 5 characters");
  }
  newTodoEntry.value = "";
}

/** SET / GET ID  */
function setID(name, idLocal) {
  return name + idLocal;
}
function getID() {}

function renderList(newTodoValue, todoID, newTodo) {
  // li element
  const newTodoLi = document.createElement("li");
  newTodoLi.todoObj = newTodo;
  // checkbox element
  const checkBox = document.createElement("INPUT");
  checkBox.type = "checkbox";
  checkBox.className = "todo-checkbox";
  checkBox.id = todoID;
  newTodoLi.appendChild(checkBox);
  // label for checkbox
  const label = document.createElement("label");
  const labelText = document.createTextNode(newTodoValue);
  label.append(labelText);
  label.setAttribute("class", "todoLabel");
  label.setAttribute("for", todoID);
  newTodoLi.appendChild(label);
  // add to the list
  todoList.appendChild(newTodoLi);
}

/** CROSS DONE TODOS */
todoList.addEventListener("change", function (e) {
  const newDoneState = e.target.checked;
  const todoObj = e.target.parentElement.todoObj;
  todoObj.done = newDoneState;
});

/**
 * FILTER
 * */
const filterDone = document.querySelector("#radioDone");
filterDone.addEventListener("click", function () {
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = todoList.children[i].todoObj;
    if (todoObj.done === false) {
      todoList.children[i].hidden = true;
    } else {
      todoList.children[i].hidden = false;
    }
  }
});
const filterAll = document.querySelector("#radioAll");
filterAll.addEventListener("click", function () {
  for (let i = 0; i < todoList.children.length; i++) {
    todoList.children[i].hidden = false;
  }
});
const filterOpen = document.querySelector("#radioOpen");
filterOpen.addEventListener("click", function () {
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = todoList.children[i].todoObj;
    if (todoObj.done === true) {
      todoList.children[i].hidden = true;
    } else {
      todoList.children[i].hidden = false;
    }
  }
});

/** DELETE ALL BTN */
const deleteAllBtn = document.getElementById("removeTodoBtn");
deleteAllBtn.addEventListener("click", function () {
  for (let i = 0; i < todoList.children.length; i++) {
    if (todos[i].done === true) {
      todoList.children[i].remove();
      todos.splice(i, 1);
    }
  }
});

loadAllTodos();

/** TODO API */
function loadAllTodos() {
  fetch("http://localhost:4730/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((item) => todos.push(item));
      data.forEach((item) => renderList(JSON.stringify(item.description)));
      console.log(todos);
    });
}

/**  SAVE TODO in local storage
function saveTodoInLocal() {
  const jsonTodo = JSON.stringify(todos);
  localStorage.setItem(storageKey, jsonTodo);
}
// READ TODO LIST from local storage
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

// INITIAL TODO LOADING
readTodoInLocal();*/
