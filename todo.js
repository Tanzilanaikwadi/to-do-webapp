// script.js

document.getElementById('add-task-btn').addEventListener('click', addTask);

let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const dateAdded = new Date().toLocaleString();
    
    // Create a task object
    const task = {
        text: taskText,
        dateAdded: dateAdded,
        completed: false
    };

    // Add task to pending tasks
    pendingTasks.push(task);
    displayTasks();

    // Clear input field
    taskInput.value = '';
}

function markAsComplete(index) {
    const task = pendingTasks.splice(index, 1)[0];
    task.completed = true;
    task.dateCompleted = new Date().toLocaleString();
    completedTasks.push(task);
    displayTasks();
}

function deleteTask(index, type) {
    if (type === 'pending') {
        pendingTasks.splice(index, 1);
    } else if (type === 'completed') {
        completedTasks.splice(index, 1);
    }
    displayTasks();
}

function displayTasks() {
    const pendingList = document.getElementById('pending-tasks');
    const completedList = document.getElementById('completed-tasks');

    // Clear the lists
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    // Display pending tasks
    pendingTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <span>${task.text} <br><small>Added: ${task.dateAdded}</small></span>
            <button class="complete-btn" onclick="markAsComplete(${index})">Mark as Complete</button>
            <button class="delete-btn" onclick="deleteTask(${index}, 'pending')">Delete</button>
        `;
        pendingList.appendChild(taskElement);
    });

    // Display completed tasks
    completedTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('completed');
        taskElement.innerHTML = `
            <span>${task.text} <br><small>Added: ${task.dateAdded}, Completed: ${task.dateCompleted}</small></span>
            <button class="delete-btn" onclick="deleteTask(${index}, 'completed')">Delete</button>
        `;
        completedList.appendChild(taskElement);
    });
}
