$(document).ready( function () {

    $.getJSON("../../../data/subreddits.json", function(data) {

        updateDate(data);
        updateTable(data);

    });

});

function updateDate(data) {
    $('#date').html(data.date);
}

function updateTable(data) {
    let table = [];

    for (let i = 0; i < data.subreddits.length; i++) {
        let row = []
        row.push(data.subreddits[i].name)
        row.push(data.subreddits[i].description)
        row.push(data.subreddits[i].members)
        row.push(data.subreddits[i].age)
        row.push(data.subreddits[i].nsfw)
        row.push(data.subreddits[i].recent_submissions)
        row.push(data.subreddits[i].moderators.length)
        table.push(row);
    }

    $('#subreddit-table').DataTable({
        data: table
    });
}