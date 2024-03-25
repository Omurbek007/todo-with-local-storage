const form = document.querySelector("#task-form");
const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const todoList = document.querySelector("#todo-list");
const searchInput = document.querySelector("#search-input");
const clearBtn = document.querySelector("#clearBtn");

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  searchInput.addEventListener("keyup", filter);
  todoList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTask);
}

// Add task Function
function addTask(event) {
  if (input.value !== "") {
    const li = document.createElement("li");
    const closeIcon = document.createElement("a");
    closeIcon.innerHTML = '<i class="fa fa-close"></i>';
    li.classList.add("collection-item");
    const firstLetter = input.value.slice(0, 1).toLocaleUpperCase();
    const restText = input.value.slice(1);
    li.textContent = firstLetter + restText;
    li.appendChild(closeIcon);
    todoList.appendChild(li);
    addTasksToLocalStorage(firstLetter + restText);
    input.value = "";
    input.classList.remove("border-red-600");
  } else {
    alert("Add Task!");
    input.classList.add("border-red-600");
  }
  event.preventDefault();
}

// Here goes a function that saves tasks to local storage
let tasks = [];
function addTasksToLocalStorage(taskItem) {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(taskItem);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// localStorage.clear();
//
// get tasks from localstorage
function getTasks() {
  tasks = [];
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    console.log(1);
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      const li = document.createElement("li");
      const closeIcon = document.createElement("a");
      closeIcon.innerHTML = '<i class="fa fa-close"></i>';
      li.classList.add("collection-item");
      const firstLetter = task.slice(0, 1).toLocaleUpperCase();
      const restText = task.slice(1);
      li.textContent = firstLetter + restText;
      li.appendChild(closeIcon);
      todoList.appendChild(li);
    });
  }
}

// localStorage.clear();

// Filter function
function filter(event) {
  const searchValue = event.target.value.toLocaleLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent.toLocaleLowerCase();

    if (item.indexOf(searchValue) != -1) {
      task.style.display = "list-item";
    } else {
      task.style.display = "none";
    }
  });
}
// Remove function

function removeTask(event) {
  if (
    event.target.tagName == "I" &&
    event.target.parentNode.parentNode.style.textDecoration !== "line-through"
  ) {
    event.target.parentNode.parentNode.style.textDecoration = "line-through";
    event.target.parentNode.parentNode.style.color = "rgb(193, 63, 11)";
  } else {
    event.target.parentNode.parentNode.remove();

    tasks.forEach((task, index) => {
      if (event.target.parentNode.parentNode.textContent === task) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
  }
}

// Clear task function

function clearTask() {
  localStorage.removeItem("tasks");
  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }
}
