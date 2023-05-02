"use strict";

const taskValue = document.querySelector(".task_value");
const taskSubmit = document.querySelector(".task_submit");
// const taskRemove = document.querySelector(".task_remove");
const taskRemoveAll = document.querySelector(".task_removeAll");
const taskList = document.querySelector(".task_list");
const finishedList = document.querySelector(".finished_list");
const table = document.querySelector(".table");
const listItem = document.querySelector(".list_item");
const taskText = document.querySelector(".task_text");
// const inputSelect = document.querySelectorAll(".input_select");
const select = document.querySelector(".select");
const selectDelete = document.querySelector(".select_delete");

//Create task
const createTask = function () {
  if (taskList.children.length < 30) {
    // Create elements
    const createListItem = document.createElement("li");
    const createInput = document.createElement("input");
    const createListContent = document.createElement("p");
    const createCompleteButton = document.createElement("button");
    const createDeleteButton = document.createElement("button");

    // Add class to the elements
    createListItem.classList.add("list_item");
    createInput.classList.add("input_select");
    createListContent.classList.add("task_text");
    createCompleteButton.classList.add("complete_button");
    createDeleteButton.classList.add("delete_button");

    createInput.setAttribute("type", "checkbox");

    // Insert elemetns
    taskList.appendChild(createListItem);
    createListItem.appendChild(createInput);
    const addListContent = createListItem.appendChild(createListContent);
    createListItem.appendChild(createCompleteButton);
    createListItem.appendChild(createDeleteButton);

    // Add text to the elemetns
    createCompleteButton.innerText = "Finished";
    createDeleteButton.innerText = "Delete";
    addListContent.innerHTML = taskValue.value;
  } else {
    alert("Over the limit!");
  }
};

// Clear
const clear = function () {
  taskValue.value = "";
  taskValue.focus();
};

// Add task
const addList = function () {
  if (taskValue.value) {
    createTask();
    clear();
  } else {
    alert("Put your task in the textbox!");
    clear();
  }
};

//Remove selected task

const deleteTask = function (e) {
  if (e.target.classList.contains("delete_button")) {
    e.target.closest("li").remove();
  }
};

// Remove All task
const removeAllList = function () {
  const children = taskList.children;
  if (children.length > 0) {
    window.confirm("Are you sure to delete all the task?");
  }
  while (children.length > 0) {
    taskList.removeChild(children[0]);
  }
  clear();
};

//Finished the task

//When the finish button pressed, delete the task
const finishedTask = function (e) {
  if (
    e.target.classList.contains("complete_button") &&
    finishedList.children.length < 30
  ) {
    e.target.closest("li").remove();

    //Create the task that was deleted

    // create elements
    const addFinishedItem = document.createElement("li");
    const addFinishedText = document.createElement("p");
    const addReturnButton = document.createElement("button");
    const addDeleteButton = document.createElement("button");

    //add class to the elements
    addFinishedItem.classList.add("list_item");
    addFinishedText.classList.add("task_text");
    addReturnButton.classList.add("recover_button");
    addDeleteButton.classList.add("delete_button");

    //insert elements
    finishedList.appendChild(addFinishedItem);
    addFinishedItem.appendChild(addFinishedText);
    addFinishedItem.appendChild(addReturnButton);
    addFinishedItem.appendChild(addDeleteButton);

    //add text to the elemenst
    addReturnButton.innerText = "Recover";
    addDeleteButton.innerText = "Delete";
    addFinishedText.innerText = e.target.previousElementSibling.innerText;
  } else if (
    e.target.classList.contains("complete_button") &&
    finishedList.children.length > 30
  ) {
    alert("Over the limit!");
  }
};

//Recover task
const RecoverTask = function (e) {
  if (
    e.target.classList.contains("recover_button") &&
    taskList.children.length < 30
  ) {
    e.target.closest("li").remove();

    //create elements
    const recoverFinishedItem = document.createElement("li");
    const recoverFinishedText = document.createElement("p");
    const recoverCompleteButton = document.createElement("button");
    const recoverDeleteButton = document.createElement("button");

    // add class to the elemetns
    recoverFinishedItem.classList.add("list_item");
    recoverFinishedText.classList.add("task_text");
    recoverCompleteButton.classList.add("complete_button");
    recoverDeleteButton.classList.add("delete_button");

    //insert elements
    taskList.appendChild(recoverFinishedItem);
    recoverFinishedItem.appendChild(recoverFinishedText);
    recoverFinishedItem.appendChild(recoverCompleteButton);
    recoverFinishedItem.appendChild(recoverDeleteButton);

    //add text to the elements
    recoverCompleteButton.innerText = "Finished";
    recoverDeleteButton.innerText = "Delete";
    recoverFinishedText.innerText = e.target.previousElementSibling.innerText;

    // delete list
  } else if (e.target.classList.contains("delete_button")) {
    e.target.closest("li").remove();
  } else if (
    e.target.classList.contains("recover_button") &&
    taskList.children.length < 6
  ) {
    alert("Over the limit!");
  }
};

//Select task
const selectButton =
  //click select button
  function () {
    if (!select.classList.contains("cancel")) {
      // display select button
      const children = [...taskList.children];
      children.forEach((child) => (child.firstChild.style.display = "block"));
      // display delete button
      selectDelete.style.display = "inline";
      // add display and change opacity
      taskValue.disabled = true;
      taskValue.style.opacity = "0.3";
      taskSubmit.disabled = true;
      taskSubmit.style.opacity = "0.3";
      taskRemoveAll.disabled = true;
      taskRemoveAll.style.opacity = "0.3";
      // selectDelete.disabled = true;
      // selectDelete.style.opacity = "0.3";

      const completeButton = document.querySelectorAll(".complete_button");
      for (let i = 0; i < completeButton.length; i++) {
        completeButton[i].disabled = true;
        completeButton[i].style.opacity = "0.3";
      }
      const deleteButton = document.querySelectorAll(".delete_button");
      for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].disabled = true;
        deleteButton[i].style.opacity = "0.3";
      }

      select.textContent = "Cancel";
      select.classList.add("cancel");
    } else {
      // Push the cancel button
      const children = [...taskList.children];
      children.forEach((child) => (child.firstChild.style.display = "none"));
      selectDelete.style.display = "none";
      taskValue.disabled = false;
      taskValue.style.opacity = "1";
      taskSubmit.disabled = false;
      taskSubmit.style.opacity = "1";
      taskRemoveAll.disabled = false;
      taskRemoveAll.style.opacity = "1";
      // selectDelete.disabled = false;
      // selectDelete.style.opacity = "1";

      const completeButton = document.querySelectorAll(".complete_button");
      for (let i = 0; i < completeButton.length; i++) {
        completeButton[i].disabled = false;
        completeButton[i].style.opacity = "1";
      }
      const deleteButton = document.querySelectorAll(".delete_button");
      for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].disabled = false;
        deleteButton[i].style.opacity = "1";
      }

      select.textContent = "Select";
      select.classList.remove("cancel");
    }
  };

taskValue.focus();
taskSubmit.addEventListener("click", addList);
taskRemoveAll.addEventListener("click", removeAllList);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", finishedTask);
finishedList.addEventListener("click", RecoverTask);
select.addEventListener("click", selectButton);
