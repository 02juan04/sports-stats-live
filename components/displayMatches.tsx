import { LeagueResponse } from "@/types/leagueResponse";
import { FixtureResponse } from "@/types/fixturesResponse";

interface props{
    league : LeagueResponse | null,
    fixtures : FixtureResponse[] | null,
}
export default function DisplayMatches({league, fixtures} : props){
    return(
        <div id="matchesWrapper" className="flex flex-col items-center border border-pink-300 w-1/3">
            <h2 className="text-center text-[35px] tracking-wide mb-5">Matches</h2>
            {
                    fixtures?.map((item, index) => (
                <div key={index} className="match-card w-2/3 flex border flex-col items-center">
                    <div className="match-header tracking-widest text-lg w-full border grid grid-flow-col grid-row-2 grid-col-1">
                        <h3 className="justify-self-center row-span-5">
                        {item.teams.home.name} 
                        <span className="tracking-wide text-sm"> VS </span>
                        {item.teams.away.name}
                        </h3>
                        <div className="flex justify-end tracking-normal text-sm">{item.fixture.status.long}</div>
                    </div>
                    <div className="score-section text-lg">{item.goals.home} - {item.goals.away} and {item.fixture.status.elapsed + (item.fixture.status.extra ?? 0)}</div>
                </div>
            ))
        }</div>
    )
}