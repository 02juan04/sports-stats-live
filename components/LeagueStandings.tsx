'use client'
import { LeagueResponse } from "@/types/leagueResponse"
import { StandingsResponse } from "@/types/standingsResponse";
import { Suspense, Fragment } from "react";
import Loading from "@/app/loading";
import { AvailableSeasonsResponse } from "@/types/leagues-Seasons-Response";


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
            <div className="w-3/8 h-full mx-5">
            <div id="season-selector-div" className="text-center">
                <h2 className="text-xl mb-5">Season 
                    <select name="seasonSelect" id="seasonSelect" onChange={handleUserSeasonPick}>
                    {
                        availableSeasons?.map((season, index) => (
                            <option key={index} value={season.year}>{season.year}-{season.year+1}</option>
                        ))
                    }
                    </select>
                </h2>

            </div>
                {
                    standings?.map((groupStanding, index) => (
                        <div key={index} className="border h-fit grid grid-flow-row grid-cols-10 mb-10">
                            <div id="standings-header" className="border col-span-1 text-center">Position</div>
                            <div id="standings-header" className="border col-span-4 text-center">Team</div>
                            <div id="standings-header" className="border col-span-1 text-center">Points</div>
                            <div id="standings-header" className="border col-span-1 text-center">GP</div>
                            <div id="standings-header" className="border col-span-1 text-center">GF</div>
                            <div id="standings-header" className="border col-span-1 text-center">GA</div>
                            <div id="standings-header" className="border col-span-1 text-center">GD</div>
                            {groupStanding.map((team) => (
                                <Fragment key={team.team.id}>
                                    <div className="team-points col-span-1 text-center border p-2">{team.rank}</div>
                                    <div className="team-points col-span-4 text-center border p-2">{team.team.name}</div>
                                    <div className="team-points border text-center font-bold rounded-full p-2 my-1">{team.points}</div>
                                    <div className="team-points border text-center p-2">{team.all.played}</div>
                                    <div className="team-points border border-white text-center p-2 text-green-500">{team.all.goals.for}</div>
                                    <div className="border border-white text-center p-2 text-red-500">{team.all.goals.against}</div>
                                    <div className="border border-white text-center p-2 text-yellow-400">{team.all.goals.for - team.all.goals.against}</div>
                                </Fragment>
                                
                            ))}
                        </div>
                    ))
                }
            </div>
        </Suspense>
    )
}