import { LeagueResponse } from "@/types/leagueResponse";

export default async function fetchLeagues(){

    const leagueIDs ={
        premierLeague : 39,
        laLiga : 140,
        ligaMX : 262,
        serieA : 135,
  }

    function filterRelevantLeagues(response : LeagueResponse){
    return (
        response.league.id === leagueIDs.premierLeague ||
        response.league.id === leagueIDs.laLiga ||
        response.league.id === leagueIDs.ligaMX ||
        response.league.id === leagueIDs.serieA
    )
    }

    const baseUrl : string = "https://v3.football.api-sports.io/leagues";

    try{
        const response = await fetch(baseUrl, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();
        return result.response.filter(filterRelevantLeagues); //an array of type LeaguePresonse
    }
    catch (error){console.log(error)}
}