let total_activity = 0;

cLog("JS carregado");

function cLog(msg) {
    var currentdate = new Date();
    var datetime = currentdate.getSeconds() + ":" +
        currentdate.getMilliseconds();
    console.log(msg + " | " + datetime);
}

$(document).ready(function () {

    cLog("Documento pronto");

    $.getJSON("../../../data/subreddits.json", function (data) {

        cLog("JSON lido");

        updateDate(data);
        cLog("Date Updated");
        updateTable(data);
        cLog("Table Updated");
    });

});

function updateDate(data) {
    let d = new Date(data.date)
    $('#date').html(
        'Última atualização: ' +
        formatDateElement(d.getDate()) + '/' + formatDateElement(d.getMonth() + 1) + '/' + d.getFullYear()
    );
}

function updateTable(data) {
    let table = [];

    for (let i = 0; i < data.subreddits.length; i++) {
        let row = {
            id: data.subreddits[i].id,
            icon: data.subreddits[i].icon,
            name: data.subreddits[i].name,
            description: data.subreddits[i].description,
            recent_submissions: data.subreddits[i].recent_submissions,
            recent_comments: data.subreddits[i].recent_comments,
            members: data.subreddits[i].members,
            age: data.subreddits[i].age,
            moderators: data.subreddits[i].moderators,
            nsfw: data.subreddits[i].nsfw
        };
        table.push(row);

        total_activity += data.subreddits[i].recent_submissions + data.subreddits[i].recent_comments;
    }

    cLog("Array table formado");

    let t = $('#subreddit-table').DataTable({
        data: table,
        colReorder: true,
        fixedHeader: true,
        responsive: true,
        mark: true,
        "processing": true,
        "lengthMenu": [
            [5, 25, 100, -1],
            [5, 25, 100, "Todos"]
        ],
        "order": [],
        "pageLength": 100,
        "pagingType": "full_numbers",
        "language": {
            "url": "https://emportugues.org/assets/lang/pt-BR.json"
        },
        "columnDefs": [{
                "visible": false,
                "targets": [1, 5]
            },
            {
                "searchable": false,
                "orderable": false,
                "targets": 0
            }
        ],
        columns: [{
                data: 'id'
            },
            {
                data: 'icon'
            },
            {
                data: 'name',
                render: $.fn.dataTable.render.name()
            },
            {
                data: 'description',
                render: $.fn.dataTable.render.description()
            },
            {
                data: 'recent_submissions',
                render: $.fn.dataTable.render.activity()
            },
            {
                data: 'recent_comments'
            },
            {
                data: 'members',
                render: $.fn.dataTable.render.members()
            },
            {
                data: 'age',
                render: $.fn.dataTable.render.age()
            },
            {
                data: 'moderators',
                render: $.fn.dataTable.render.moderators()
            },
            {
                data: 'nsfw',
                render: $.fn.dataTable.render.nsfw()
            }
        ],
        colReorder: {
            fixedColumnsLeft: 1
        },
        "initComplete": function (settings, json) {
            tlite(el => el.classList.contains('data-tooltip'));
            $("#loading-screen").css("visibility", "hidden");
            $("#loading-screen").css("opacity", 0);
        }
    });

    cLog("Datatable formado");

    t.on('order.dt search.dt', function () {
        t.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
            t.cell(cell).invalidate('dom');
        });
    }).draw();

    cLog("X");
}

$.fn.dataTable.render.age = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            var d = new Date(data * 1000);
            return '<div class="age-wrapper data-tooltip" data-tlite="s" title="' + timeSince(d) + '">' + formatDateElement(d.getDate()) + '/' + formatDateElement(d.getMonth() + 1) + '/' + d.getFullYear() + '</div>';
        }
        return data;
    }
};

$.fn.dataTable.render.nsfw = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            return '<div class="nsfw-wrapper ' + (data ? '"><i class="fa fa-check" aria-hidden="true"></i>' : ' grayed-out"><i class="fa fa-times" aria-hidden="true"></i>') + '</div>';
        }
        return data;
    }
};

$.fn.dataTable.render.description = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            return (data == '' ? '<div class="description-wrapper-empty">- - -' : '<div class="description-wrapper">' + marked(data)) + '</div>';
        }
        return data;
    }
};

$.fn.dataTable.render.moderators = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            return '<div class="moderators-wrapper data-tooltip" data-tlite="s" title="' + getModerators(data) + '">' + data.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</div>';
        }
        return data.length;
    }
};

function getModerators(data) {
    let moderators = '';
    for (let i = 0; i < data.length; i++) {
        moderators += data[i] + '<br>';
    }
    return moderators;
}

$.fn.dataTable.render.members = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            return '<div class="members-wrapper data-tooltip" data-tlite="s" title="Crescimento: TBD">' + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</div>';
        }
        return data;
    }
};

$.fn.dataTable.render.activity = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            return '<div class="activity-wrapper data-tooltip" data-tlite="s" title="' + 'Posts: ' + data + '<br>Comentários: ' + row.recent_comments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '">' + ((((data + row.recent_comments) / total_activity) * 100) > 0 && (((data + row.recent_comments) / total_activity) * 100) < 0.01 ? '< 0,01' : Number(((data + row.recent_comments) / total_activity) * 100).toFixed(2).toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")) + '%' + '</div>';
        }
        return data + row.recent_comments;
    }
};

$.fn.dataTable.render.name = function () {
    return function (data, type, row) {
        if (type === 'display' || type === 'filter') {
            let icon = '';
            if (row.nsfw) {
                icon = 'assets/img/subreddit-nsfw.png'
            } else {
                icon = (row.icon == '' ? 'assets/img/subreddit.png' : row.icon);;
            }
            return '<div class="subreddit-wrapper ' + (row.icon == '' || row.nsfw ? 'transparent' : '') + '"><img src="' + icon +
                '" width="25px" height="25px" style="border-radius: 50%;">' +
                '<a class="subreddit-link" target="_blank" href="https://www.reddit.com/' + data + '">' +
                data + '</a></div>';
        }
        return data;
    }
};

$('#subreddit-table').on('page.dt', function () {
    $("html").animate({
        scrollTop: 0
    }, "slow");
});

function formatDateElement(element) {
    return ('0' + element).slice(-2);
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " anos";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " meses";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " dias";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " horas";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutos";
    }
    return Math.floor(seconds) + " segundos";
}
