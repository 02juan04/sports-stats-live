'use client'
import { LeagueResponse } from "@/types/leagueResponse"
import { useState } from "react";


interface props{
    leagues : LeagueResponse[], 
    selectedLeague : number | null, 
    handleSelectedLeague : (id: number) => void
}

export default  function DisplayLeagues({ leagues, selectedLeague, handleSelectedLeague } : props){

    return (
        <div className="w-1/5 h-full">
            <h2>Leagues</h2>
            {
                leagues.map((item : LeagueResponse) => 
                (
                    <div key={item.league.id} onClick={() => {
                        handleSelectedLeague(item.league.id);
                    }}>
                        <h3 className={`border text-center p-5 hover:bg-gray-700  focus:bg-gray-500 active:bg-gray-500 cursor-pointer text-xl tracking-wider ${selectedLeague === item.league.id ? "bg-gray-500" : ''}`}>{item.league.name}</h3>
                    </div>
                )
                )
            }
        </div>
    )
}