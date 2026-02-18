import { FixtureResponse } from "@/types/fixturesResponse";

export default  function fetchEvents(fixtures : FixtureResponse[] | null){

    const baseUrl : string = "https://v3.football.api-sports.io/fixtures/events";

    const fixtureIDs = fixtures?.map(item => item.fixture.id);

    fixtureIDs?.forEach(item => console.log(item));

    // try{
    //     const response = await fetch(`${baseUrl}?fixture=`, {
    //         headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
    //         next : {revalidate : 3600}
    //     })

    //     const result = await response.json();
    //     console.log(result.response, "these are the fixtures");
    //     return result.response;
    // }
    // catch (error){console.log(error)}
}