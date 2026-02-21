import { LeagueResponse } from "@/types/leagueResponse"
import { StandingsResponse } from "@/types/standingsResponse";
import { Suspense, Fragment } from "react";
import Loading from "@/app/loading";
import { AvailableSeasonsResponse } from "@/types/leagues-Seasons-Response";
import Image from "next/image";


interface props{
    selectedSeason : number,
    handleSeasonChange : (season: number) => void,
    standingsResponse : StandingsResponse[] | null,
    availableSeasons : AvailableSeasonsResponse,
    selectedLeague : LeagueResponse | null
    
}


export default function LeagueStandings({selectedLeague, handleSeasonChange, standingsResponse, selectedSeason} : props){    
    
    //response always gives me one element
    const normalizedResponse = standingsResponse?.at(0);

    const standings = normalizedResponse?.league.standings;
    console.log(standings)

    const availableSeasons = selectedLeague?.seasons;

    const handleUserSeasonPick = (e: React.ChangeEvent<HTMLSelectElement>) => handleSeasonChange(Number(e.target.value));


    return(
        <Suspense fallback={<Loading/>}>
            <section className="standings-section-container lg:mt-0 lg:h-full lg:col-span-8 lg:mx-5 relative">
                <div id="season-selector-div" className="flex justify-center items-center mb-5 text-[1.2rem] xl:text-[1.6rem] tracking-widest gap-3">
                    <h2>Season</h2>
                    <select name="seasonSelect" id="seasonSelect" onChange={handleUserSeasonPick} value={selectedSeason} className="text-white w-auto">
                    {
                        availableSeasons?.map((season, index) => (
                            <option key={index} value={season.year}>{season.year}-{season.year+1}</option>
                        ))
                    }
                    </select><span className="text-xs">(Select)</span>
                </div>
                {
                    standings?.map((groupStanding, index) => (
                        <Fragment key={index}>
                            <div className="group-name-description text-lg">{groupStanding.at(0)?.group}</div> {/*the idea here is inside current group, grab the group string from the first 'team', and thats the description*/}
                        <div className="standings h-fit p-10 grid grid-flow-row grid-cols-13 mb-10  bg-gradient-to-tr from-[#440f50]/15 via-[#595656]/30 to-[#440f50]/15 rounded-xl shadow-xl">
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">Position</div>
                            <div id="standings-header" className="col-span-5 text-center p-2 text-lg tracking-widest">Team</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">Points</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">GP</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">GW</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">GL</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">G+</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">G-</div>
                            <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest">G+/-</div>
                            {groupStanding.map((team) => (
                                <div className="standings-team-slot col-span-13 grid grid-cols-13 mb-3 p-5 text-lg rounded-xl hover:bg-white/10 hover:text-xl hover:shadow-md duration-150" key={team.team.id}>
                                    <div className="team-points text-center">{team.rank}</div>
                                    <div className="team-points col-span-5 text-center relative">
                                        <div className="team-logo-standings absolute -z-1 left-10 w-10 h-10 bottom-0">
                                            <Image className="opacity-45 lg:opacity-100 lg:absolute lg:block object-contain" src={team.team.logo} alt={`${team.team.logo}logo`} fill></Image>
                                        </div>
                                        {team.team.name}
                                    </div>
                                    <div className="team-points text-center font-bold text-xl">{team.points}</div>
                                    <div className="team-points text-center ">{team.all.played}</div>
                                    <div className="team-points text-center text-green-500 ">{team.all.win}</div>
                                    <div className="team-points text-center text-red-500 ">{team.all.lose}</div>
                                    <div className="team-points border-white text-center">{team.all.goals.for}</div>
                                    <div className="border-white text-center">{team.all.goals.against}</div>
                                    <div className="border-white text-center">{team.all.goals.for - team.all.goals.against}</div>
                                </div>
                                
                            ))}
                        </div>
                    </Fragment>
                    ))
                }
            </section>
        </Suspense>
    )
}