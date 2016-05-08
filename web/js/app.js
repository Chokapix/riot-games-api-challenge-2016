var roles = {"Lucian": "ADC", "Ezreal": "ADC", "Thresh": "Support", "LeeSin": "Jungle", "Vayne": "ADC", "Taric": "Support", "Caitlyn": "ADC", "Alistar": "Support", "Jhin": "ADC", "Braum": "Support", "Blitzcrank": "Support", "Sivir": "ADC", "Leblanc": "Middle", "Janna": "Support", "Graves": "Jungle", "Gragas": "Jungle", "Azir": "Middle", "Ahri": "Middle", "Soraka": "Support", "Maokai": "Top", "Tristana": "ADC", "Kindred": "Jungle", "Morgana": "Support", "Zed": "Middle", "Yasuo": "Middle", "Fizz": "Middle", "Jinx": "ADC", "Darius": "Top", "TwistedFate": "Middle", "Nidalee": "Jungle", "MasterYi": "Jungle", "Khazix": "Jungle", "Lux": "Middle", "Bard": "Support", "Leona": "Support", "Irelia": "Top", "Elise": "Jungle", "Ekko": "Top", "Malphite": "Top", "Trundle": "Top", "Amumu": "Jungle", "Riven": "Top", "Lissandra": "Middle", "Nami": "Support", "Draven": "ADC", "Rengar": "Jungle", "Nautilus": "Top", "Orianna": "Middle", "Poppy": "Top", "Renekton": "Top", "Annie": "Middle", "Nasus": "Top", "Gangplank": "Top", "Shaco": "Jungle", "Vi": "Jungle", "Ashe": "ADC", "Garen": "Top", "XinZhao": "Jungle", "Kalista": "ADC", "Evelynn": "Jungle", "Katarina": "Middle", "Jax": "Jungle", "Shen": "Top", "Shyvana": "Jungle", "KogMaw": "ADC", "Malzahar": "Middle", "Twitch": "ADC", "Fiora": "Top", "Nocturne": "Jungle", "Diana": "Middle", "Volibear": "Jungle", "Lulu": "Support", "Ryze": "Top", "Olaf": "Top", "Sona": "Support", "MissFortune": "ADC", "Anivia": "Middle", "Sion": "Top", "Karma": "Support", "Corki": "ADC", "Warwick": "Jungle", "Gnar": "Top", "Zac": "Jungle", "Viktor": "Middle", "Pantheon": "Top", "Sejuani": "Jungle", "Rammus": "Jungle", "Kassadin": "Middle", "Tryndamere": "Top", "DrMundo": "Top", "Udyr": "Jungle", "Hecarim": "Jungle", "Vladimir": "Top", "Talon": "Middle", "Brand": "Middle", "Velkoz": "Middle", "Rumble": "Top", "RekSai": "Jungle", "Syndra": "Middle", "Teemo": "Top", "Kayle": "Top", "JarvanIV": "Jungle", "Xerath": "Middle", "TahmKench": "Support", "Zilean": "Support", "MonkeyKing": "Top", "Zyra": "Support", "Varus": "ADC", "Chogath": "Top", "FiddleSticks": "Jungle", "Illaoi": "Top", "Cassiopeia": "Middle", "Quinn": "Top", "Ziggs": "Middle", "Kennen": "Top", "Veigar": "Middle", "Akali": "Top", "Swain": "Middle", "Jayce": "Middle", "AurelionSol": "Middle", "Skarner": "Jungle", "Singed": "Top", "Karthus": "Middle", "Galio": "Middle", "Heimerdinger": "Top", "Aatrox": "Top", "Nunu": "Jungle", "Mordekaiser": "Top", "Yorick": "Top", "Urgot": "Top"};

$(document).ready(function () {

    $('.champion-filter').click(function (e) {
        e.preventDefault();
        sortChampions($(this).data("filter"), $(this).data("order"));
    });

    var rolesAggs = {
        "ADC" : 0,
        "Support" : 0,
        "Jungle" : 0,
        "Middle" : 0,
        "Top" : 0
    };
    var rolesLabels = ["ADC", "Support", "Jungle", "Middle", "Top"];

    $.each(masteryList, function (i,v) {
        rolesAggs[roles[i]] += v.championPoints;
    });

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
    });
});

function sortChampions(attr, order){
    attr = attr.toLowerCase();
    order = order == "desc" ? -1 : 1;
    $("#champion-container").html($('.champion').sort(function (a, b) {
        var contentA = $(a).data(attr);
        var contentB = $(b).data(attr);
        return order * ((contentA > contentB) ? 1 : (contentA < contentB) ? -1 : 0);
    }));
}