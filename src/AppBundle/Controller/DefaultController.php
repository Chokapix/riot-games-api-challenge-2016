<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use LeagueWrap\Api;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="index")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/{region}/{summonerName}", name="result")
     * @param $region
     * @param $summonerName
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function resultAction($region, $summonerName, Request $request)
    {
        $region = strtolower($region);
        $api = new Api($this->getParameter('lol_api_key'));
        $api->setRegion($region);
        $summonerApi = $api->summoner();
        $championMastery = $api->ChampionMastery();

        $summoner = $summonerApi->info($summonerName);
        $masteryList = $championMastery->champions($summoner);
        $championsJson = file_get_contents("data/en_GB/champion.json");
        $champions = json_decode($championsJson, true);
        $champions = $champions['data'];

        $aggs = array(
            "totalPoints" => 0,
            "totalLevels" => 0,
        );

        $masteryListJson = [];

        foreach ($masteryList as $mastery) {
            foreach ($champions as $name => $champion) {
                if ($champion['key'] == $mastery->championId) {
                    foreach (["championPoints", "championLevel", "championPointsSinceLastLevel", "championPointsUntilNextLevel", "chestGranted", "highestGrade"] as $property) {
                        $masteryListJson[$champion['name']][$property] = $mastery->{$property};
                    }
                }
            }
            $aggs["totalPoints"] += $mastery->championPoints;
            $aggs["totalLevels"] += $mastery->championLevel;
        }

        return $this->render(
            'default/result.html.twig',
            array(
                'region' => $region,
                'summonerName' => $summonerName,
                'champions' => $champions,
                'championsJson' => $championsJson,
                'aggs' => $aggs,
                'masteryListJson' => json_encode($masteryListJson),
                'masteryList' => $masteryList,
            )
        );
    }
}
