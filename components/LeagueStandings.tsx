'use client'
import { LeagueResponse } from "@/types/leagueResponse"
import { StandingsResponse } from "@/types/standingsResponse";
import { Suspense, Fragment } from "react";
import Loading from "@/app/loading";
import { AvailableSeasonsResponse } from "@/types/leagues-Seasons-Response";
import Image from "next/image";


interface props{
    selectedSeason : number | null,
    handleSeasonChange : (season: number) => void,
    standingsResponse : StandingsResponse[] | null,
    availableSeasons : AvailableSeasonsResponse,
    selectedLeague : LeagueResponse | null
    
}


export default function LeagueStandings({selectedLeague, handleSeasonChange, standingsResponse} : props){    
    
    //response always gives me one element
    const normalizedResponse = standingsResponse?.at(0);

    const standings = normalizedResponse?.league.standings;

    const availableSeasons = selectedLeague?.seasons;

    const handleUserSeasonPick = (e: React.ChangeEvent<HTMLSelectElement>) => handleSeasonChange(Number(e.target.value));


    return(
        <Suspense fallback={<Loading/>}>
            <div className=" my-20 lg:mt-10 lg:mt-0 lg:h-full lg:col-span-8 lg:mx-5">
                <div id="season-selector-div" className="flex justify-center items-center pb-5 mb-5 lg: mb-0 text-[1.2rem] xl:text-[2.5rem] tracking-widest gap-3">
                    <h2>Season</h2>
                    <select name="seasonSelect" id="seasonSelect" onChange={handleUserSeasonPick}>
                    {
                        availableSeasons?.map((season, index) => (
                            <option key={index} value={season.year}>{season.year}-{season.year+1}</option>
                        ))
                    }
                    </select><span className="text-xs">(Select)</span>
                </div>
                {
                    standings?.map((groupStanding, index) => (
                        <div key={index} className="h-fit grid grid-flow-row grid-cols-10 mb-10">
                            <div id="standings-header" className="border-b col-span-1 text-center p-2 text-lg tracking-widest">Position</div>
                            <div id="standings-header" className="border-b col-span-4 text-center p-2 text-lg tracking-widest">Team</div>
                            <div id="standings-header" className="border-b col-span-1 text-center p-2 text-lg tracking-widest">Points</div>
                            <div id="standings-header" className="border-b col-span-1 text-center p-2 text-lg tracking-widest">GP</div>
                            <div id="standings-header" className="border-b col-span-1 text-center p-2 text-lg tracking-widest">GF</div>
                            <div id="standings-header" className="border-b col-span-1 text-center p-2 text-lg tracking-widest">GA</div>
                            <div id="standings-header" className="border-b col-span-1 text-center p-2 text-lg tracking-widest">GD</div>
                            {groupStanding.map((team) => (
                                <Fragment key={team.team.id}>
                                    <div className="team-points col-span-1 text-center border-b p-4">{team.rank}</div>
                                    <div className="team-points col-span-4 text-center border-b p-4 relative text-center">
                                        <div className="team-logo-standings absolute -z-1 left-14 w-10 h-full top-0">
                                            <Image className="opacity-45 lg:opacity-100 lg:absolute lg:block object-contain" src={team.team.logo} alt={`${team.team.logo}logo`} fill></Image>
                                        </div>

                                        {team.team.name}
                                    </div>
                                    <div className="team-points border-b text-center font-bold p-4 text-xl">{team.points}</div>
                                    <div className="team-points border-b text-center p-4">{team.all.played}</div>
                                    <div className="team-points border-b border-white text-center p-4 text-green-500">{team.all.goals.for}</div>
                                    <div className="border-b border-white text-center p-4 text-red-500">{team.all.goals.against}</div>
                                    <div className="border-b border-white text-center p-4 text-yellow-400">{team.all.goals.for - team.all.goals.against}</div>
                                </Fragment>
                                
                            ))}
                        </div>
                    ))
                }
            </div>
        </Suspense>
    )
}