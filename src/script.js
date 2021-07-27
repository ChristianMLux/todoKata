/**
 * GLOBAL VARIABLES
 */
let todos = [];
let apiList = [];
const storageKey = "todos";
const todoList = document.querySelector("#todoList");
const newTodoEntry = document.getElementById("addTodoTf");
const addTodoBtn = document.querySelector("#addTodoBtn");
let index = 1;
let todoEntry = null;

initApi();
loadAllTodos();

/** TODO CLASS CONSTRUCTOR */
class Todo {
  constructor(id, descriptionParameter) {
    this.id = id;
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
  let id = "";

  if (newTodoEntry.value.length >= 5) {
    newTodoValue = newTodoEntry.value;
    id = setID(index++);
    console.log(id);
    let newTodo = new Todo(id, newTodoValue);

    todos.push(newTodo);
    apiList.push(newTodo);
    addToApi(newTodo);

    renderList(newTodoValue, id, newTodo);
  } else {
    console.log("sorry, please enter at least 5 characters");
  }
  newTodoEntry.value = "";
}

/** SET / GET ID  */
function setID(idLocal) {
  return idLocal;
}

function renderList(newTodoValue, todoID, newTodo) {
  // li element
  const newTodoLi = document.createElement("li");
  newTodoLi.setAttribute("data-cy", "todoLi");
  newTodoLi.todoObj = newTodo;
  // checkbox element
  const checkBox = document.createElement("INPUT");
  checkBox.type = "checkbox";
  checkBox.className = "todo-checkbox";
  checkBox.id = todoID;
  checkBox.setAttribute("data-cy", "todoCheckbox");
  newTodoLi.appendChild(checkBox);
  // label for checkbox
  const label = document.createElement("label");
  const labelText = document.createTextNode(newTodoValue);
  label.append(labelText);
  label.setAttribute("class", "todoLabel");
  label.setAttribute("for", todoID);
  label.setAttribute("data-cy", "todoLabel");
  newTodoLi.appendChild(label);
  // add to the list
  todoList.appendChild(newTodoLi);
}

/** CROSS DONE TODOS */
todoList.addEventListener("change", function (e) {
  const newDoneState = e.target.checked;
  const todoObj = e.target.parentElement.todoObj;
  putDone(todoObj, newDoneState, todoObj.id);
  console.log(todoObj);
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
  for (let i = apiList.length - 1; i >= 0; i--) {
    if (todos[i].done === true) {
      deleteDoneApi(getDoneID(todos[i]));
      todoList.children[i].remove();
      todos.splice(i, 1);
      apiList.splice(i, 1);
    }
  }
});

/** TODO API */
// INIT API
function initApi() {
  fetch("http://localhost:4730/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((item) => apiList.push(new Todo(item.id, item.description)));
    });
}
// LOAD TODOS FROM DB, RENDER LIST
function loadAllTodos() {
  fetch("http://localhost:4730/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((item) => todos.push(item));
      data.forEach((item) =>
        renderList(
          JSON.stringify(item.description),
          JSON.stringify(item.id),
          item
        )
      );
      console.log("todos array " + JSON.stringify(todos));
      console.log("apiList array " + JSON.stringify(apiList));
    });
}
// ADD TODO TO DB
function addToApi(todo) {
  let header = new Headers();
  header.append("Content-Type", "application/json");
  let body = JSON.stringify(todo);
  let request = {
    method: "POST",
    headers: header,
    body: body,
    redirect: "follow",
  };
  fetch("http://localhost:4730/todos", request)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
// DELETE TODOS WITH id
function deleteDoneApi(id) {
  var raw = "";
  var requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow",
  };
  fetch("http://localhost:4730/todos/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
// READ DONE STATE
function getDoneID(todo) {
  let id = 0;
  if (todo.done === true) {
    console.log(todo + " is done");
    id = todo.id;
    console.log(id);
    return id;
  } else {
    console.log("not done");
  }
}
// SET DONE STATE
function putDone(todo, boolean, id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: todo.id,
    description: todo.description,
    done: boolean,
  });
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("http://localhost:4730/todos/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
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
