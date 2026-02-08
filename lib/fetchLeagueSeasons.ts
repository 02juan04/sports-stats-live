export default async function fetchAvailableSeasons(){

    const baseUrl : string = "https://v3.football.api-sports.io/leagues/seasons";

    try{
        const response = await fetch(baseUrl, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();

        return result.response
    }
    catch (error){console.log(error)}
}