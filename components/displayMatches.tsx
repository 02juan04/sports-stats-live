import { LeagueResponse } from "@/types/leagueResponse";
import { FixtureResponse } from "@/types/fixturesResponse";
import Image from "next/image";

interface props{
    league : LeagueResponse | null,
    fixtures : FixtureResponse[] | null,
}
export default function DisplayMatches({league, fixtures} : props){

    const inPlay = ["HT", "1H", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];

    function isInPlay(item : FixtureResponse) : boolean{
        return inPlay.includes(item.fixture.status.short);
    }

    const dates : Array<string> = [];

    fixtures?.forEach(item => !dates.includes(item.fixture.date) ? dates.push(item.fixture.date) : item)
    

return (
    <div id="matches-section" className="lg:flex lg:flex-col lg:items-center lg:col-span-4">
        <h2 className="text-center text-[35px] tracking-wide mb-20">
        {league?.league.name} Matches
        </h2>
        <div id="match-cards-container" className="backdrop-blur-xl rounded-lg w-full overflow-y-auto h-380">



        {fixtures?.map((item, index) => {
            
            const live = isInPlay(item);

        return (
            <div key={index} className={`match-card w-full flex relative flex-col items-center rounded-xl shadow-lg pb-5 mb-3 z-1 lg:hover:bg-gradient-to-br lg:hover:from-red-500/25 lg:hover:to-white/15 lg:hover:duration-200 lg:hover:shadow-lg ${live ? "text-green-400" : ""}`}>
                <div className="m-auto pt-4">{item.fixture.date.split("T").at(0)}</div>
                <div className="match-card-header flex justify-between pl-5 pr-5 pb-0 w-full tracking-widest">
                    <div className="match-status text-sm text-center inline">{item.fixture.status.long}</div>
                    <div className="match-time p-1 text-center">{item.fixture.status.elapsed}{item.fixture.status.extra
                        ? <span>+{item.fixture.status.extra}&apos;</span> : "'"}
                    </div>
                </div>
                <div className="match-card-team-section tracking-widest text-lg w-full p-5 pt-0 relative">
                    <div className="team-logo-container absolute left-10 lg:left-6 2xl:left-25 xl:left-15 -z-1 md:left-50 sm:left-40 w-20 h-20">
                    <Image
                        src={item.teams.home.logo}
                        alt={`${item.teams.home.name} logo`}
                        fill
                        className="opacity-30 lg:opacity-70 object-contain"
                    />
                </div>
                <h3 className="teams-versus text-center">
                    {item.teams.home.name}
                    <span className="tracking-wide text-sm block"> VS </span>
                    {item.teams.away.name}
                </h3>
                <div className="team-logo-container absolute top-0 right-10 lg:right-6 2xl:right-25 xl:right-15 -z-1 md:right-50 sm:right-40 w-20 h-20">
                    <Image
                    src={item.teams.away.logo}
                    alt={`${item.teams.away.name} logo`}
                    fill
                    className="opacity-30 lg:opacity-70"
                    />
                </div>
                </div>

                <div className="score-section text-lg">
                    {item.goals.home} - {item.goals.away}
                </div>
            </div>
            );
        })}
        </div>
    </div>
    );
}