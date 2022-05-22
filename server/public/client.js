$(onReady)

function onReady () {
    // Fetching table data on start
    getTasks()
    // Button handlers
    $('#taskbody').on('click', '.mark', markComplete);
    $('#taskbody').on('click', '.delete', deleteTask);
    $('#submit').on('click', addTask);
}

// Fetch data with GET

let completed = [];

function getTasks () {
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(response => {
        $('#taskbody').empty();

        // Pushes the completed task's id in "completed" array

        for ( task of response ) {
            if ( task.is_complete) {
                completed.push(task.id)
            }

            $('#taskbody').append(`<tr>
                <td id = '${task.id}'>${task.task}</td>
                <td><button data-taskid = ${task.id} class = 'mark'>✔</button></td>
                <td><button data-taskid = ${task.id} class = 'delete'>X</button></td>
            </tr>`)
        }
        findCompleted()
    })
};



// Finding and styling completed tasks

function findCompleted () {
    let completedTask = $('#taskbody').find('td');
    completedTask.each( function () {
        for ( task of completed ) {
            if ( Number(this.id) === task ) {
                $(this).addClass('completed')
                return
            }
        }
    })
}

// Marking complete with PUT

function markComplete ( event ) {
    let taskid = $(event.target).data("taskid")
    let current = $(event.target);
    console.log(current)
    $.ajax({
        method: 'PUT',
        url: `/list/${taskid}`
    }).then(response => {
        getTasks()
    }).catch(error => {
        console.log('error updating task', error)
    })
};

// DELETE task

function deleteTask ( event ) {
    let taskid = $(event.target).data("taskid")
    console.log('delete');
    $.ajax({
        method: 'DELETE',
        url: `/list/${taskid}`
    }).then(response => {
        getTasks();
        console.log('deleting task with id of:', taskid)
    }).catch( error => {
        console.log('error deleting task', error)
    })
};

// Add a task with POST

function addTask () {
    $.ajax({
        method: 'POST',
        url: '/list',
        data: {
            task: $('#newTask').val()
        }
    }).then(response => {
        getTasks();
        console.log(`Sent ${$('#newTask').val()}`)
    }).catch(error => {
        console.log('error posting on client side', error)
    })
}