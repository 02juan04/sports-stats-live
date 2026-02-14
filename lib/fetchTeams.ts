import { LeagueResponse } from "@/types/leagueResponse";

export async function fetchTeams(selectedLeague : LeagueResponse, season : number){ //fetching all teams from the current season
    
    const teamsURl = "https://v3.football.api-sports.io/teams";

    const userRequest = `league=${selectedLeague.league.id}&season=${season}`;


    try{
        const response = await fetch(`${teamsURl}?${userRequest}`, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        });

        const result = await response.json();

        return result.response;
    }
    catch(error){console.log(error)}
}