
// function to get tasks
$(function () {
  $.ajax({
    type: "get",
    url: "/MyTasks",
    dataType: "json",
    success: function (user) {
      $(".title-welcome span").text(user.username);
      user.tasks.forEach(function (task) {
        showTasks(task);
      });
    }
  });
});

// function to add a new task
$(function () {
 $("#form-add-task").on("submit", function (e) {
  e.preventDefault();
   var newTask = {
    taskName: $("#taskname").val(),
    taskDate: $("#taskdate").val(),
    taskTime: $("#taskTime").val(),
    taskDescription: $("#description").val(),
  }
  $.ajax({
    type: "post",
    url: "/addtask",
    dataType: "json",
    data: newTask,
    success: function (data) {
      if (data.error) {
        return $(".alert-messages h2").text(data.eror);
      }
      if (data.success) {
       $(".alert-messages h2").text(data.success);
       $(".user-tasks").html("");
       data.user.tasks.forEach(function (task) {
        return showTasks(task);
       });
      }
    }
  });
 });
 
});
// function to show the tasks
function showTasks(task) {
     var container = $(`
          <li class="li-task">
          <span class="remove-item">x</span>
            ${task.taskName ? `<h3>task name: ${task.taskName}</h3>` : ""}
            ${task.taskDescription ? `<p>task description: ${task.taskDescription}</p>` : ""}
            ${task.taskTime ? `<p>task time: ${task.taskTime}</p>` : ""}
            ${task.taskDate ? `<p>task date: ${task.taskDate}</p>` : ""}
            <p class="task-id">${task.id}</p>
            
          </li>
          `)
      return  $(".user-tasks").append((container)); 
  }

  // function removeTask(eleement) {
  //   console.log($(eleement));
  // }
  
// $(function () {
  $(document).on("click", ".remove-item", function () {
    var taskId = $(this).parent(".li-task").find(".task-id").text();
    console.log(taskId);
    $.ajax({
        type: "delete",
        url: "/deleteTask",
        data: {taskId: taskId},
        success: function (data) {
           if (data.error) {
            $(".alert-messages h2").text(data.error);
           }
         if (data.success) {
            $(".alert-messages h2").text(data.success);
            $(".user-tasks").html("");
             data.user.tasks.forEach(function (task) {
              showTasks(task);
            });
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
});
// });
