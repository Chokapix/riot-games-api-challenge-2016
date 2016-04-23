$(document).ready(function () {

    $('.champion-filter').click(function (e) {
        e.preventDefault();
        sortChampions($(this).data("filter"));
    })
});

function sortChampions(attr){
    attr = attr.toLowerCase();
    $("#champion-container").html($('.champion').sort(function (a, b) {
        var contentA = parseInt($(a).data(attr));
        var contentB = parseInt($(b).data(attr));
        console.log(contentA);
        return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
    }));
}