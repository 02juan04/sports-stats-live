import { LeagueResponse } from "@/types/leagueResponse";
import { FixtureResponse } from "@/types/fixturesResponse";

export default async function fetchLastFixtures(selectedLeague : LeagueResponse | null, season : number | null, last? : number){


    console.log(selectedLeague, season);
    const baseUrl : string = "https://v3.football.api-sports.io/fixtures";

    
    const last10Matches : string = last ? `league=${selectedLeague?.league.id}&season=${season}&last=${last}` : `league=${selectedLeague?.league.id}&season=${season}`;
    

    try{
        const response = await fetch(`${baseUrl}?${last10Matches}`, {
            headers : {"x-apisports-key" : "99897285f1b0a70cc1fb3cf261ef3189"},
            next : {revalidate : 3600}
        })

        const result = await response.json();
        const fixtures  : FixtureResponse[] = result.response;

        fixtures.map(item => {
            const string_from_api = item.fixture.date;
            const date = new Date(string_from_api);
            const losAngelesTime = date.toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            dateStyle : 'short',
            timeStyle : 'short'
            });

            item.fixture.date = losAngelesTime;
            console.log(item.fixture.date);

        });

        return result.response;
    }
    catch (error){console.log(error)}
}