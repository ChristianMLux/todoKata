/**
 * GLOBAL VARIABLES
 */
const todos = [];
//const storageKey = "todos";
const todoList = document.querySelector("#todoList");
const newTodoEntry = document.getElementById("addTodoTf");
const addTodoBtn = document.querySelector("#addTodoBtn");
let index = 0;
let todoEntry = null;

/** TODO BTN LISTENER */
if (addTodoBtn) {
  addTodoBtn.addEventListener("click", addTodo);
} else {
  console.log("Sorry, can't find addTodoBtn");
}
/** TODO ADD FUNCTION */
function addTodo() {
  //get textinput value
  const newTodoValue = newTodoEntry.value;
  const todoID = setID("todo", index++);
  //array
  const newTodo = {
    todoID: todoID,
    description: newTodoValue,
    done: false,
  };
  todos.push(newTodo);
  //list
  const newTodoLi = document.createElement("li");
  newTodoLi.todoObj = newTodo;

  const checkBox = document.createElement("INPUT");
  checkBox.type = "checkbox";
  checkBox.className = "todo-checkbox";
  checkBox.id = todoID;
  newTodoLi.appendChild(checkBox);

  const label = document.createElement("label");
  const labelText = document.createTextNode(newTodoValue);
  label.append(labelText);
  label.setAttribute("class", "todoLabel");
  label.setAttribute("for", todoID);
  newTodoLi.appendChild(label);

  todoList.appendChild(newTodoLi);

  //input clear
  newTodoEntry.value = "";
}

/** SET / GET ID  */
function setID(name, idLocal) {
  return name + idLocal;
}
function getID() {}

todoList.addEventListener("change", function (e) {
  const newDoneState = e.target.checked;
  const todoObj = e.target.parentElement.todoObj;
  todoObj.done = newDoneState;
});

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
