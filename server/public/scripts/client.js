

$(document).ready(onReady);

function onReady() {
    // fetches initial data from the database using GET
    getTask();

    // click listeners
    $('#submit').on('click', postTask);
    $('#taskTable').on('click', '.completeBtn', completeTask);
    $('#taskTable').on('click', '.deleteBtn', deleteTask);
}


// AJAX GET to retrieve data array from the DB and append
function getTask() {
    console.log('in get');
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function (response) {
        // this appends into a table
        // I thought about using an list instead, but I liked how I could make the <td> for the task text turn green for completion confirmation
        $('#taskTableBody').empty();
        for (let i = 0; i < response.length; i++) {
            $('#taskTableBody').append(`
                <tr>
                    <td class="task" id="taskText${response[i].id}">${response[i].task}</td>
                    <td><button data-id="${response[i].id}" class="completeBtn">Complete</button></td>
                    <td><button data-id="${response[i].id}" class="deleteBtn">DELETE</button></td>
                </tr>
            `);
            // conditional to check if the "complete" boolean is true or false
            // adds a class that changes the background color
            if (response[i].complete == true) {
                $(`#taskText${response[i].id}`).addClass('complete');
            }
        }
    }).catch(function (error) {
        console.log(error);
    });
}

// AJAX POST to to send input information to the DB
function postTask() {
    console.log('in post');
    let payloadObject = {
        task: $('#taskIn').val()
    }
    $.ajax({
        method: 'POST',
        url: '/list',
        data: payloadObject
    }).then(function (response) {
        // re-append using GET
        getTask();
        // Clear inputs
        $('#taskIn').val('')
    });
}

// AJAX PUT to change the value of the "complete" part of the task
function completeTask() {
    let taskId = $(this).data('id');

    $.ajax({
        method: 'PUT',
        url: `/list/${taskId}`
    }).then(function(response) {
        // re-append using GET
        getTask();
    }).catch(function(error){
        console.log(error);
        
    })
}

// AJAX DELETE to remove rows from the DB
function deleteTask() {
    let taskId = $(this).data('id');
    
    $.ajax({
        method: 'DELETE',
        url: `/list/${taskId}`
    }).then(function(response){
        // re-append using GET
        getTask();
    }).catch(function(error){
        console.log(error);
    });
}