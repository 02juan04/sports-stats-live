export default async function fetchStandings(leagueId : number, season : number){

    const baseUrl : string = "https://v3.football.api-sports.io/standings";

    const userRequest : string = `league=${leagueId}&season=${season}`

    try{
        const response = await fetch(`${baseUrl}?${userRequest}`, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();

        console.log(result);
        console.log("we made it here")
        return result.response
    }
    catch (error){console.log(error)}
}