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

    console.log(dates);
    

    return(
        //TODO
        //fix visual for live games so it matches the other ones
        <div id="matchesContainer" className="lg:flex lg:flex-col lg:items-center lg:col-span-4">
            <h2 className="text-center text-[35px] tracking-wide mb-5">{league?.league.name} Matches</h2>
                {
                fixtures?.map((item, index) => (
                    
                isInPlay(item) ? (
                    <div key={index} className="match-card w-full border border-white rounded-b-xl flex flex-col items-center text-green-400">
                        <div className="match-header tracking-widest w-full border-b border-white grid grid-flow-col grid-cols-10 grid-rows-1">
                            <div className="match-status text-sm p-1 text-center col-span-2">{item.fixture.status.long}</div>
                            <h3 className="teams-versus text-center text-[25px] col-span-6">
                            {item.teams.home.name} 
                            <span className="tracking-wide text-sm p-1 block"> VS </span>
                            {item.teams.away.name}
                            </h3>
                            <div className="match-time p-1 text-center col-span-2">
                                {item.fixture.status.elapsed}
                                {item.fixture.status.extra ? <span>+{item.fixture.status.extra}&apos;</span> : "'"}
                            </div>
                        </div>
                    <div className="score-section text-lg w-full text-center text-[30px] p-2">{item.goals.home} - {item.goals.away}</div>
                </div>
                )

                :

                        <div key={index} className="match-card w-full flex flex-col items-center border-b pb-5 border-white/65 z-5 lg:hover:bg-white/5">
                            <div className="m-auto pt-4">{item.fixture.date.split('T').at(0)}</div>
                    <div className=" match-card-header flex justify-between pl-5 pr-5 pb-0 w-full tracking-widest">
                            <div className="match-status text-sm text-center inline">{item.fixture.status.long}</div>
                            <div className="match-time p-1 text-center">
                                {item.fixture.status.elapsed}
                                {item.fixture.status.extra ? <span>+{item.fixture.status.extra}&apos;</span> : "'"}
                            </div>
                        </div>
                    <div className="match-card-team-section tracking-widest text-lg w-full p-5 pt-0 relative">
                        <div className="team-logo-container absolute left-10 lg:left-6 2xl:left-25 xl:left-15 -z-1 md:left-50 sm:left-40 w-20 h-20">
                            <Image src={item.teams.home.logo} alt={`${item.teams.home.name} logo`} fill className="opacity-30 lg:opacity-70 object-contain"/>
                        </div>
        
                        <h3 className="teams-versus text-center">
                            {item.teams.home.name}
                            <span className="tracking-wide text-sm block"> VS </span>
                            {item.teams.away.name}
                        </h3>

                        <div className="team-logo-container absolute top-0 right-10 lg:right-6 2xl:right-25 xl:right-15 -z-1 md:right-50 sm:right-40 w-20 h-20">
                            <Image src={item.teams.away.logo} alt={`${item.teams.away.name} logo`} fill className="opacity-30 lg:opacity-70 "/>
                        </div>
                    </div>
                    <div className="score-section text-lg ">{item.goals.home} - {item.goals.away}</div>
                </div>
            ))
        }</div>
    )
}