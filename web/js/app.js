var roles = {"Lucian": "ADC", "Ezreal": "ADC", "Thresh": "Support", "LeeSin": "Jungle", "Vayne": "ADC", "Taric": "Support", "Caitlyn": "ADC", "Alistar": "Support", "Jhin": "ADC", "Braum": "Support", "Blitzcrank": "Support", "Sivir": "ADC", "Leblanc": "Middle", "Janna": "Support", "Graves": "Jungle", "Gragas": "Jungle", "Azir": "Middle", "Ahri": "Middle", "Soraka": "Support", "Maokai": "Top", "Tristana": "ADC", "Kindred": "Jungle", "Morgana": "Support", "Zed": "Middle", "Yasuo": "Middle", "Fizz": "Middle", "Jinx": "ADC", "Darius": "Top", "TwistedFate": "Middle", "Nidalee": "Jungle", "MasterYi": "Jungle", "Khazix": "Jungle", "Lux": "Middle", "Bard": "Support", "Leona": "Support", "Irelia": "Top", "Elise": "Jungle", "Ekko": "Top", "Malphite": "Top", "Trundle": "Top", "Amumu": "Jungle", "Riven": "Top", "Lissandra": "Middle", "Nami": "Support", "Draven": "ADC", "Rengar": "Jungle", "Nautilus": "Top", "Orianna": "Middle", "Poppy": "Top", "Renekton": "Top", "Annie": "Middle", "Nasus": "Top", "Gangplank": "Top", "Shaco": "Jungle", "Vi": "Jungle", "Ashe": "ADC", "Garen": "Top", "XinZhao": "Jungle", "Kalista": "ADC", "Evelynn": "Jungle", "Katarina": "Middle", "Jax": "Jungle", "Shen": "Top", "Shyvana": "Jungle", "KogMaw": "ADC", "Malzahar": "Middle", "Twitch": "ADC", "Fiora": "Top", "Nocturne": "Jungle", "Diana": "Middle", "Volibear": "Jungle", "Lulu": "Support", "Ryze": "Top", "Olaf": "Top", "Sona": "Support", "MissFortune": "ADC", "Anivia": "Middle", "Sion": "Top", "Karma": "Support", "Corki": "ADC", "Warwick": "Jungle", "Gnar": "Top", "Zac": "Jungle", "Viktor": "Middle", "Pantheon": "Top", "Sejuani": "Jungle", "Rammus": "Jungle", "Kassadin": "Middle", "Tryndamere": "Top", "DrMundo": "Top", "Udyr": "Jungle", "Hecarim": "Jungle", "Vladimir": "Top", "Talon": "Middle", "Brand": "Middle", "Velkoz": "Middle", "Rumble": "Top", "RekSai": "Jungle", "Syndra": "Middle", "Teemo": "Top", "Kayle": "Top", "JarvanIV": "Jungle", "Xerath": "Middle", "TahmKench": "Support", "Zilean": "Support", "MonkeyKing": "Top", "Zyra": "Support", "Varus": "ADC", "Chogath": "Top", "FiddleSticks": "Jungle", "Illaoi": "Top", "Cassiopeia": "Middle", "Quinn": "Top", "Ziggs": "Middle", "Kennen": "Top", "Veigar": "Middle", "Akali": "Top", "Swain": "Middle", "Jayce": "Middle", "AurelionSol": "Middle", "Skarner": "Jungle", "Singed": "Top", "Karthus": "Middle", "Galio": "Middle", "Heimerdinger": "Top", "Aatrox": "Top", "Nunu": "Jungle", "Mordekaiser": "Top", "Yorick": "Top", "Urgot": "Top"};

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

    /*var rolesAggs = {
        "ADC" : 0,
        "Support" : 0,
        "Jungle" : 0,
        "Middle" : 0,
        "Top" : 0
    };
    var rolesLabels = ["ADC", "Support", "Jungle", "Middle", "Top"];

    if(masteryList !== undefined){
        $.each(masteryList, function (i,v) {
            rolesAggs[roles[i]] += v.championPoints;
        });
    }

    var datas = [];
    for (var i = 0; i < rolesLabels.length; i++) {
        datas.push(rolesAggs[rolesLabels[i]]);
    }

    var ctx = document.getElementById("roles-pie");
    var data = {
        labels: rolesLabels,
        datasets: [
            {
                data: datas,
                backgroundColor: [
                    "#d64541",
                    "#df5787",
                    "#00b16a",
                    "#e67e22",
                    "#3498db"
                ]
            }]
    };
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data
    });*/
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
 * Share on Facebook
 */
function FBshare() {
    var w =  window.open('https://www.facebook.com/sharer/sharer.php?u='+window.location.href+'', 'facebook_share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    return false
}

/**
 * Share on Twitter
 */
function TWshare() {
    var text = "I earned a total of " + $('#result-points').text() + " mastery points and " + $('#result-levels').text() + " mastery level in League of Legends !";
    var w =  window.open('https://twitter.com/intent/tweet?url='+window.location.href+'&text='+text , 'twitter_share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    return false
}