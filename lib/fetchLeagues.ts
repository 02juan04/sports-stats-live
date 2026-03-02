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
        saudi : 307,
        argentina : 128,
        scotland_prem: 179,
        conca_champions : 16,
    }

    function filterRelevantLeagues(response : LeagueResponse){
        const relevantIds = Object.values(leagueIDs);
        
        return relevantIds.includes(response.league.id);
    }

    function changeToBetterNames(response : LeagueResponse){
        switch(response.league.id){
            case leagueIDs.scotland_prem:
                response.league.name = "Scotland Premiership"
                break;
            case leagueIDs.brasileirao : 
                response.league.name = "Brasileirao"
                break;
            case leagueIDs.saudi : 
                response.league.name = "Saudi League"
                break;
            }
    }

    const baseUrl : string = "https://v3.football.api-sports.io/leagues";

    try{
        const response = await fetch(baseUrl, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();

        const filteredLeagues : LeagueResponse[] = result.response.filter(filterRelevantLeagues); //an array of type LeaguePresonse
        filteredLeagues.map(item=> (changeToBetterNames(item)));

        console.log(filteredLeagues);
        
        return filteredLeagues;
    }
    catch (error){console.log(error)}
}