import { LeagueResponse } from "@/types/leagueResponse";

export default async function fetchStandings(selectedLeague : LeagueResponse | null, season : number | null){

    console.log(selectedLeague, season);
    const baseUrl : string = "https://v3.football.api-sports.io/standings";

    const userRequest : string = `league=${selectedLeague?.league.id}&season=${season}`

    try{
        const response = await fetch(`${baseUrl}?${userRequest}`, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();

        return result.response;
    }
    catch (error){console.log(error)}
}