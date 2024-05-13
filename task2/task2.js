$( function() {
  $("#datepickerIcon").click(function() {
    $("#datepicker").datepicker("show");
  });

  $( "#datepicker" ).datepicker({
    onSelect: function(dateText) {
      $("#datepicker").val(dateText);
    }
  });
} );

let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const dateInput = document.getElementById("datepicker");
  const taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    content: taskInput.value,
    priority: prioritySelect.value,
    date: dateInput.value, // Include the date input value in the task object
    completed: false
  };

  tasks.push(task);

  renderTasks(taskList);

  taskInput.value = "";
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  const taskList = document.getElementById("taskList");
  renderTasks(taskList);
}

function toggleTaskComplete(id) {
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  const taskList = document.getElementById("taskList");
  renderTasks(taskList);
}

function renderTasks(taskList) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = `Task: ${task.content} - Priority: ${task.priority} - Due Date: ${task.date}`;
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
    }
    li.appendChild(taskText);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Mark as Complete";
    completeBtn.className = "complete-btn";
    if (task.completed) {
      completeBtn.classList.add("completed");
    }
    completeBtn.onclick = function() {
      toggleTaskComplete(task.id);
    };
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove ❌";
    deleteBtn.className = "delete";
    deleteBtn.onclick = function() {
      deleteTask(task.id);
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}


