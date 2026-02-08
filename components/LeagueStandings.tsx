'use client'
import { LeagueResponse } from "@/types/leagueResponse"

interface props{
    selectedLeague: number | null,
    selectedSeason : number |null,
    handleSelectedSeason : (season: number) => void
}


export default function LeagueStandings({selectedLeague, selectedSeason, handleSelectedSeason} : props){
    
    
    
    return(
        <>
            <div className="w-1/3 h-full border border-green-400">
                <p>{selectedLeague}</p>
            </div>
        </>
    )
}