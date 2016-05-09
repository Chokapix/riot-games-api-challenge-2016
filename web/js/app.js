$(document).ready(function () {
    $('.champion-filter').click(function (e) {
        e.preventDefault();
        $('.champion-filter').removeClass('active');
        $(this).addClass('active');
        sortChampions($(this).data("filter"), $(this).data("order"));
    });

    $.each($('.champion'), function (i, v) {
        $(v).attr('data-highestgrade', getHighestGradeScore($(v).attr('data-highestgrade')));
    });

    $('.champion-filter[data-filter=championPoints]').click();
});

/**
 * Sort champions by specified attr and order
 * @param attr
 * @param order
 */
function sortChampions(attr, order){
    attr = attr.toLowerCase();
    order = order == "desc" ? -1 : 1;
    $("#champion-container").html($('.champion').sort(function (a, b) {
        var contentA = $(a).data(attr);
        var contentB = $(b).data(attr);
        return order * ((contentA > contentB) ? 1 : (contentA < contentB) ? -1 : 0);
    }));
}

$(document).on('change keyup', '#input-analytics', function (e) {
    e.preventDefault();
    updateLink();
});

$(document).on('click', '#server-list > li', function (e) {
    e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    updateLink();
});

/**
 * Update form link
 */
function updateLink(){
    var server = $('#server-list').find('li.active').text();
    var summonerName = $('#input-analytics').val();
    var link = "/" + server + '/' + summonerName;
    $('#btn-link').attr('href', link);
}

/**
 * Transform letter grade into sortable score
 * @param grade
 * @returns {number}
 */
function getHighestGradeScore(grade){
    if(grade === undefined){
        return 0;
    }
    var score = 0;
    if(grade[0] !== undefined){
        switch (grade[0]) {
            case 'S':
                score += 40;
                break;
            case 'A':
                score += 30;
                break;
            case 'B':
                score += 20;
                break;
            case 'C':
                score += 10;
                break;
        }
    }
    if(grade[1] !== undefined){
        switch (grade[1]) {
            case '+':
                score ++;
                break;
            case '-':
                score --;
                break;
        }
    }
    return score;
}

/**
 * Share on Twitter
 */
function TWshare() {
    var text = "I earned a total of " + $('#result-points').text() + " mastery points and " + $('#result-levels').text() + " mastery level in League of Legends !";
    var w =  window.open('https://twitter.com/intent/tweet?url='+window.location.href+'&text='+text , 'twitter_share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    return false
}