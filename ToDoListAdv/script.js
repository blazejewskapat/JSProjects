let TASKS;
let GIVEN_TASK_NAME;
let ADD_TASK;
let TASKS_ERROR;

let REMOVE_BUTTONS;

let PANEL_TO_EDIT_TASK;
let EDIT_ERROR;
let NEW_TASK_NAME;
let ACCEPT;
let CANCEL;

let EDIT_EVENT;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  setTasksStatus();
};

const prepareDOMElements = () => {
  TASKS = document.querySelector(".tasks");
  GIVEN_TASK_NAME = document.querySelector("#givenTaskName");
  ADD_TASK = document.querySelector(".addTask");
  TASKS_ERROR = document.querySelector(".tasksError");
  PANEL_TO_EDIT_TASK = document.querySelector(".panelToEditTask");
  EDIT_ERROR = document.querySelector(".editError");
  NEW_TASK_NAME = document.querySelector("#newTaskName");
  ACCEPT = document.querySelector(".accept");
  CANCEL = document.querySelector(".cancel");
  REMOVE_BUTTONS = document.querySelectorAll(".removeTask");
};

const prepareDOMEvents = () => {
  ADD_TASK.addEventListener("click", addNewTask);
  TASKS.addEventListener("click", checkEvent);
  CANCEL.addEventListener("click", cancelEditTask);
  ACCEPT.addEventListener("click", changeTask);
};

const setTasksStatus = () => {
  const taskElements = TASKS.querySelectorAll(".taskInfo");
  const hasTasks = taskElements.length > 0;
  TASKS_ERROR.style.display = hasTasks ? "none" : "flex";
};

const changeTask = () => {
  if (NEW_TASK_NAME.value !== "") {
    EDIT_ERROR.style.display = "none";
    if (EDIT_EVENT) {
      EDIT_EVENT.children[0].innerText = NEW_TASK_NAME.value;
    }
    NEW_TASK_NAME.value = "";
    PANEL_TO_EDIT_TASK.style.display = "none";
  } else {
    EDIT_ERROR.style.display = "flex";
  }
};

const cancelEditTask = () => {
  NEW_TASK_NAME.value = "";
  EDIT_ERROR.style.display = "none";
  PANEL_TO_EDIT_TASK.style.display = "none";
};

const checkEvent = (event) => {
  let removeButton = event.target.closest(".removeTask");
  let editButton = event.target.closest(".editTask");
  let checkButton = event.target.closest(".checkTask");
  if (removeButton) {
    removeTaskFunc(event);
    setTasksStatus();
  } else if (editButton) {
    editTaskFunc(event);
  } else if (checkButton) {
    checkTaskFunc(event);
  }
};

const removeTaskFunc = (event) => {
  let taskInfo = event.target.closest(".taskInfo");
  if (taskInfo) {
    taskInfo.remove();
  }
};

const checkTaskFunc = (event) => {
  let taskInfo = event.target.closest(".taskInfo");
  if (taskInfo) {
    taskInfo.children[0].classList.toggle("finished");
  }
};

const editTaskFunc = (event) => {
  PANEL_TO_EDIT_TASK.style.display = "flex";
  EDIT_EVENT = event.target.closest(".taskInfo");
};

const addNewTask = () => {
  let taskName = GIVEN_TASK_NAME.value;
  if (taskName !== "") {
    TASKS_ERROR.style.display = "none";
    let newTask = document.createElement("div");
    newTask.classList.add("taskInfo");
    newTask.innerHTML = `          <p class="taskName">${taskName}</p>
  <div class="options">
    <button class="checkTask"><i class="fa-solid fa-check"></i></button>
    <button class="editTask">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="removeTask">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>`;
    TASKS.appendChild(newTask);
    GIVEN_TASK_NAME.value = "";
  } else {
    TASKS_ERROR.innerText = "Podaj treść zadania!";
    TASKS_ERROR.style.display = "flex";
  }
};

document.addEventListener("DOMContentLoaded", main);
