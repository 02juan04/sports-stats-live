import { LeagueResponse } from "@/types/leagueResponse";

export default async function fetchLeagues(){

    const leagueIDs ={
        premierLeague : 39,
        laLiga : 140,
        ligaMX : 262,
        serieA : 135,
        championsLeague : 2,
        mls : 253,
        brasileirao : 71,
        eredivisie : 88,
        saudi : 308,
    }

    function filterRelevantLeagues(response : LeagueResponse){
        const relevantIds = Object.values(leagueIDs);
        
        return relevantIds.includes(response.league.id);
    }

    const baseUrl : string = "https://v3.football.api-sports.io/leagues";

    try{
        const response = await fetch(baseUrl, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();

        const filteredLeagues : LeagueResponse[] = result.response.filter(filterRelevantLeagues); //an array of type LeaguePresonse
        filteredLeagues.map(item=> item.league.id === leagueIDs.brasileirao ? item.league.name = "Brasileirao" : item.league.name);

        console.log(filteredLeagues);
        
        return filteredLeagues;
    }
    catch (error){console.log(error)}
}