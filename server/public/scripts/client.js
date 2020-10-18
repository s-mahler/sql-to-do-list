console.log('JS');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getTask();
    $('#submit').on('click', postTask);
}

function getTask() {
    console.log('in get');
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            $('#taskTableBody').append(`
                <tr>
                    <td>${response[i].task}</td>
                    <td><button data-id="${response[i].id}" class="completeBtn">Complete</button></td>
                    <td><button data-complete="${response[i].complete}" data-id="${response[i].id}" class="rankUp">DELETE</button></td>
                </tr>
            `);
        }
    }).catch(function(error) {
        console.log(error);
    });
}

function postTask() {
    console.log('in post');
}