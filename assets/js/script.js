// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.floor(Math.random() * 100000);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  $('#todo-cards').append(`
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${task.date}</h6>
        <p class="card-text">${task.date} --- ${task.id}</p>
      </div>
    </div>`);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  const task = {
    title: $('#title').val(),
    id: generateTaskId(),
    date: $('#date').val(),
    content: $('#content').val(),
  };

  $('#title').val('');
  $('#date').val('');
  $('#content').val('');
  $('#formModal').modal('hide');
  createTaskCard(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#modalSubmit').on('click', handleAddTask);
});
