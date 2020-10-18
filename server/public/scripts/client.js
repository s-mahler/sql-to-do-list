console.log('JS');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getTask();
    $('#submit').on('click', postTask);
    $('#taskTable').on('click', '.completeBtn', completeTask);
    $('#taskTable').on('click', '.deleteBtn', deleteTask);
}

function getTask() {
    console.log('in get');
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function (response) {
        $('#taskTableBody').empty();
        for (let i = 0; i < response.length; i++) {
            $('#taskTableBody').append(`
                <tr>
                    <td>${response[i].task}</td>
                    <td><button data-id="${response[i].id}" class="completeBtn">Complete</button></td>
                    <td><button data-id="${response[i].id}" class="deleteBtn">DELETE</button></td>
                </tr>
            `);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

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
        getTask();
        $('#taskIn').val('')
    });
}

function completeTask() {
    console.log('hello from complete');
}

function deleteTask() {
    console.log('hello from delete');
}