import { LeagueResponse } from "@/types/leagueResponse";
import { FixtureResponse } from "@/types/fixturesResponse";
import Image from "next/image";
import { useState } from "react";
interface props{
    league : LeagueResponse | null,
    fixtures : FixtureResponse[] | null,
}


//TODO Work on pagination for matches. limit 10 per 'page'
export default function DisplayMatches({league, fixtures} : props){
    const [matchStatus, setMatchStatus] = useState<"scheduled" | "inPlay" | "finished">("finished");

    const inPlay = ["HT", "1H", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
    const scheduled = ["TBD", "NS"];
    const finished = ["FT", "AET", "PEN"];

    function isScheduled(item : FixtureResponse) : boolean{
        return scheduled.includes(item.fixture.status.short);
    }

    function isInPlay(item : FixtureResponse) : boolean{
        return inPlay.includes(item.fixture.status.short);
    }

    function isFinished(item : FixtureResponse) : boolean{
        return finished.includes(item.fixture.status.short);
    }

    interface MatchStatus{
        scheduled : FixtureResponse[],
        inPlay : FixtureResponse[],
        finished : FixtureResponse[]
    }

    const matches = fixtures?.reduce<MatchStatus>((acc, curr) => {

        if (isScheduled(curr)) acc.scheduled.push(curr);
        if (isInPlay(curr)) acc.inPlay.push(curr);
        if (isFinished(curr)) acc.finished.push(curr);

        return acc;
    }, {
        scheduled : [],
        inPlay : [],
        finished : []
    });       

    //sorting past matches for proper display (grab the latest date first)
    matches?.finished.sort((a,b) => {
        const aDate = new Date(a.fixture.date).getTime();
        const bDate = new Date(b.fixture.date).getTime();
        return  bDate - aDate;
    });




return (
    <div id="matches-section" className="lg:flex lg:flex-col lg:items-center lg:col-span-4">
        <h2 id="matches-section-header" className=" mt-20 lg:mt-0 bg-[var(--dashboard-card-headers)] shadow-md mb-10 lg:mb-10  w-full text-center py-3 px-5 rounded-lg text-[1.2rem] xl:text-[1.8rem] tracking-wider gap-3 main-title">
        {league?.league.name} Matches
        </h2>
        <div id="status-buttons" className="flex flex-row w-full justify-evenly mb-5">
            <MatchStatusButton text="Past Matches" setMatchStatus={() => setMatchStatus("finished")} active={matchStatus === "finished"}></MatchStatusButton>
            <MatchStatusButton text="Upcoming Matches" setMatchStatus={() => setMatchStatus("scheduled")}  active={matchStatus === "scheduled"}></MatchStatusButton>
            <MatchStatusButton text="Live Matches" setMatchStatus={() => setMatchStatus("inPlay")}  active={matchStatus === "inPlay"}></MatchStatusButton>
        </div>

        <div id="match-cards-container" className="rounded-lg w-full h-380">
        {matches?.[matchStatus].map((item, index) => {

        return (
            <div key={index} className={`match-card bg-[var(--dashboard-card-color)] dashboard-card selectable w-full flex relative flex-col items-center rounded-xl shadow-lg pb-5 mb-3 z-1 hover:scale-103 hover:bg-gray-700 duration-200 "text-green-400" : ""}`}>
                <div className="match-card-header flex flex-col pl-5 pr-5 pb-0 w-full tracking-widest secondary-title">
                    <div className="m-auto pt-4 w-full flex justify-between">
                        <p>{item.fixture.date.split(",").at(0)}</p>
                        <p>{item.fixture.date.split(",").at(1)}</p>
                    </div>
                </div>
                <div className="match-card-team-section tracking-widest text-lg w-full mb-5 relative main-title text-center">
                    <div className="team-logo-container absolute left-10 lg:left-6 2xl:left-15 xl:left-15 -z-1 md:left-50 sm:left-40 w-20 h-20">
                        <Image
                            src={item.teams.home.logo}
                            alt={`${item.teams.home.name} logo`}
                            fill
                            className="opacity-30 lg:opacity-70 object-contain"
                        />
                    </div>
                    <h3 className="teams-versus w-fit m-auto flex flex-col justify-evenly">
                        {item.teams.home.name}
                        <span className="tracking-widest text-xs"> VS </span>
                        {item.teams.away.name}
                    </h3>
                    <div className="team-logo-container absolute top-0 right-10 lg:right-6 2xl:right-15 xl:right-15 -z-1 md:right-50 sm:right-40 w-20 h-20">
                        <Image
                        src={item.teams.away.logo}
                        alt={`${item.teams.away.name} logo`}
                        fill
                        className="opacity-30 lg:opacity-70"
                        />
                    </div>
                </div>
                { matchStatus !== "scheduled" &&
                <div className="match-stats flex flex-row justify-evenly w-full">
                    <div className="match-status flex items-center">{matchStatus === "inPlay" ? item.fixture.status.long : item.fixture.status.short}</div>
                    <div className="match-scrore text-[2em] font-bold">{item.goals.home} - {item.goals.away}</div>
                    <div className="match-time flex items-center">{item.fixture.status.elapsed}{item.fixture.status.extra ? <span>+{item.fixture.status.extra}&apos;</span> : `'`}</div>
                </div>
                }
            </div>
            );
        })}
        </div>
    </div>
    );
}

function MatchStatusButton({text, setMatchStatus, active} : {text : string, setMatchStatus : ()=>void, active:boolean}){
    return(
        <button onClick={setMatchStatus} className={`${active ?  'bg-[var(--selectable-hover-color)] scale-110 ring-2 ring-indigo-600' : 'bg-[var(--dashboard-buttons)]'}
                                                    text-center text-xs py-[1em] px-[0.75em] lg:text-sm lg:py-[0.75em] lg:px-[1em] rounded-full cursor-pointer hover:bg-[var(--selectable-hover-color)] 
                                                    hover:scale-110 ring-none transition duration-200`}>
            {text}
        </button>
    )
}