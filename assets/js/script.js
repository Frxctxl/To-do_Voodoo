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
    <div class="card task z-3 ${task.status} ui-draggable ui-draggable-handle">
      <div class="card-body ${task.status}">
        <h5 class="card-title">${task.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${task.date}</h6>
        <p class="card-text">${task.content}</p>
        <button type="button" id="delete" class="btn btn-dark">Delete</button>
      </div>
    </div>`);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards').empty();
  for (i of taskList) {
    createTaskCard(i);
  }
  $('.task').draggable({
    opacity: 0.9,
    zIndex: 600,
    helper: function (eventObj) {
      let el = $(eventObj.target);
      if (el.is('.task')) {
        return el.clone()
      } else {
        return el.closest('.task').clone();
      }
    }
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask() {
  const statusCheck = new Date($('#date').val()).toLocaleDateString();
  const currDate = new Date().toLocaleDateString()
  let status
  if (statusCheck < currDate) {
    status = 'bg-danger';
  } else if (statusCheck == currDate) {
    status = 'bg-warning';
  } else {
    status = 'bg-info';
  }


  const task = {
    title: $('#title').val(),
    id: generateTaskId(),
    date: $('#date').val(),
    content: $('#content').val(),
    status: status
  };

  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));

  $('#title').val('');
  $('#date').val('');
  $('#content').val('');
  $('#formModal').modal('hide');
  createTaskCard(task);
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(eventObj) {
  taskList.splice(taskList.indexOf(eventObj.target), 1);
  console.log('o');
  localStorage.setItem('tasks', JSON.stringify(taskList));
  console.log(taskList)
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log(ui.draggable);
  $(event.target).append(ui.draggable[0]);

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#modalSubmit').on('click', handleAddTask);
  $('#date').datepicker();
  renderTaskList();
  $('.basin').droppable({
    accept: '.task',
    drop: handleDrop,
  });
  $('#delete').on('click', handleDeleteTask);
});
