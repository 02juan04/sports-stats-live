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
                <header id="season-section-header" className="dashboard-card shadow-md text-center m-auto py-3 px-5 rounded-xl mb-5 text-[1.2rem] xl:text-[2rem] tracking-wider gap-3">
                    <h2 className="main-title">Standings</h2>
                </header>
                {
                    standings?.map((groupStanding, index) => (
                        <Fragment key={index}>
                            <div className="group-name-description text-lg flex dashboard-card w-fit ml-auto rounded-t py-2 px-4 secondary-title">Select Season:
                                <div className="text-lg">
                                <select name="seasonSelect" id="seasonSelect" onChange={handleUserSeasonPick} value={selectedSeason} className="w-auto outline rounded p-1 ml-2">
                                {
                                availableSeasons?.map((season, index) => (
                                    <option key={index} value={season.year}>{season.year}-{season.year+1}</option>))
                                }
                                </select>
                            </div>    
                            </div> {/*the idea here is inside current group, grab the group string from the first 'team', and thats the description*/}
                            <div className="standings dashboard-card h-fit p-10 grid grid-flow-row grid-cols-13 mb-10  rounded-xl rounded-tr-none shadow-xl">
                                <h1 className="col-span-13 secondary-title text-xl">{groupStanding.at(0)?.group}</h1>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest main-title">Position</div>
                                <div id="standings-header" className="col-span-5 text-center p-2 text-lg tracking-widest main-title">Team</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest main-title">Pts</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest secondary-title">GP</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest secondary-title">GW</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest secondary-title">GL</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest secondary-title">G+</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest secondary-title">G-</div>
                                <div id="standings-header" className="col-span-1 text-center p-2 text-lg tracking-widest secondary-title">G+/-</div>
                                {groupStanding.map((team) => (
                                    <div className="standings-team-slot col-span-13 grid grid-cols-13 mb-3 p-5 text-lg rounded-xl hover:scale-105 hover:shadow hover:bg-black/5 duration-150" key={team.team.id}>
                                        <div className="team-points text-center main-title">{team.rank}</div>
                                        <div className="team-points col-span-5 text-center relative main-title">
                                            <div className="team-logo-standings absolute left-10 w-10 h-10 bottom-0">
                                                <Image className="opacity-45 lg:opacity-100 lg:absolute lg:block object-contain" src={team.team.logo} alt={`${team.team.logo}logo`} fill></Image>
                                            </div>
                                            {team.team.name}
                                        </div>
                                        <div className="team-points text-center font-bold text-xl main-title">{team.points}</div>
                                        <div className="team-points text-center secondary-title">{team.all.played}</div>
                                        <div className="team-points text-center secondary-title">{team.all.win}</div>
                                        <div className="team-points text-center secondary-title">{team.all.lose}</div>
                                        <div className="team-points border-white text-center secondary-title">{team.all.goals.for}</div>
                                        <div className="border-white text-center secondary-title">{team.all.goals.against}</div>
                                        <div className="border-white text-center secondary-title">{team.all.goals.for - team.all.goals.against}</div>
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