let taskInput = document.getElementById("new-task");

let addButton = document.getElementsByTagName("button")[0];

let incompleteTaskHolder = document.getElementById("incomplete-tasks");

let completedTasksHolder = document.getElementById("completed-tasks");

function createNewTaskElement(taskString) {
 let listItem = document.createElement("li");

 let deleteButton = document.createElement("button");
 let newTask = document.createElement("newTask");
 let checkBox = document.createElement("input");

 newTask.innerText = taskString;

 checkBox.type = "checkbox";

 deleteButton.innerText = "Delete";
 deleteButton.className = "delete";

 listItem.appendChild(checkBox);
 listItem.appendChild(newTask);
 listItem.appendChild(deleteButton);

 return listItem;
}

function addTask() {
 let listItem = createNewTaskElement(taskInput.value);

 if (taskInput.value === "") {
  return;
 }

 incompleteTaskHolder.appendChild(listItem);
 bindTaskEvents(listItem, taskCompleted);

 taskInput.value = "";
}

function deleteTask() {
 let listItem = this.parentNode;

 let ul = listItem.parentNode;

 ul.removeChild(listItem);
}

function taskCompleted() {
 let listItem = this.parentNode;
 completedTasksHolder.appendChild(listItem);
 bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
 let listItem = this.parentNode;
 incompleteTaskHolder.appendChild(listItem);
 bindTaskEvents(listItem, taskCompleted);
}

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
 let checkBox = taskListItem.querySelector("input[type=checkbox]");
 let deleteButton = taskListItem.querySelector("button.delete");

 deleteButton.onclick = deleteTask;
 checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
 bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
 bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
