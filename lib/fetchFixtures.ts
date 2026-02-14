import { LeagueResponse } from "@/types/leagueResponse";

export default async function fetchFixtures(selectedLeague : LeagueResponse | null, season : number | null, last? : number){


    console.log(selectedLeague, season);
    const baseUrl : string = "https://v3.football.api-sports.io/fixtures";

    
    const userRequest : string = last ? `league=${selectedLeague?.league.id}&season=${season}&last=${last}` : `league=${selectedLeague?.league.id}&season=${season}&last=10`;
    
    

    try{
        const response = await fetch(`${baseUrl}?${userRequest}`, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();
        console.log(result.response, "these are the fixtures");
        return result.response;
    }
    catch (error){console.log(error)}
}