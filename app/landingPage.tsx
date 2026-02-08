'use client'

import DisplayLeagues from "@/components/displayLeagues"
import LeagueStandings from "@/components/LeagueStandings"
import { LeagueResponse } from "@/types/leagueResponse"
import { useState } from "react"

export default function LandingPage({filteredLeagues, handleFetchStandings} : {filteredLeagues : LeagueResponse[], handleFetchStandings : }){
    const [selectedLeague, setLeague] = useState<number | null>(null);
    const [selectedSeason, setSeason] = useState<number | null>(2025);


    function handleSelectLeague(id : number){
        setLeague(id)
        console.log("this was called")
    }
    
    function handleSelectedSeason(year : number){
        setSeason(year);
    }

    return(
        <div className="flex flex-row w-full h-full">
            <DisplayLeagues leagues={filteredLeagues} selectedLeague={selectedLeague} handleSelectedLeague={handleSelectLeague}></DisplayLeagues>
            <LeagueStandings selectedLeague={selectedLeague} selectedSeason={selectedSeason} handleSelectedSeason={handleSelectedSeason}></LeagueStandings>
        </div>
    )
    
}