'use client'

import DisplayLeagues from "@/components/displayLeagues"
import LeagueStandings from "@/components/LeagueStandings"
import DisplayMatches from "@/components/displayMatches"

import { LeagueResponse } from "@/types/leagueResponse"
import { StandingsResponse } from "@/types/standingsResponse"
import { AvailableSeasonsResponse } from "@/types/leagues-Seasons-Response"
import { FixtureResponse } from "@/types/fixturesResponse"

import fetchLastFixtures from "@/lib/fetchFixtures"
import fetchStandings from "@/lib/fetchStandings"

import { useEffect, useState, Suspense } from "react"

import Loading from "./loading"
// import { EventResponse } from "@/types/eventResponse"
// import fetchEvents from "@/lib/fetchEvents"


export default function LandingPage({filteredLeagues, availableSeasons} : {filteredLeagues : LeagueResponse[] | undefined , availableSeasons : AvailableSeasonsResponse}){
    const [selectedLeague, setLeague] = useState<LeagueResponse | null>(null);
    const [selectedSeason, setSeason] = useState<number>();
    const [standingsResponse, setStandingResponse] = useState<StandingsResponse[] | null>(null);
    const [fixtures, setFixtures] = useState<FixtureResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    
    useEffect(() => {
        //if we dont have both states, return
        if(!selectedLeague || !selectedSeason) return;


        async function getStandings(selectedLeague : LeagueResponse, selectedSeason : number){
            const standings : StandingsResponse[] = await fetchStandings(selectedLeague, selectedSeason)
            setStandingResponse(standings);
            setLoading(false);
        }

        getStandings(selectedLeague, selectedSeason);

        async function getFixtures(selectedLeague : LeagueResponse, selectedSeason : number){
            const fixtures : FixtureResponse[] = await fetchLastFixtures(selectedLeague, selectedSeason);
            setFixtures(fixtures)
        }
        
        getFixtures(selectedLeague, selectedSeason);

    },[selectedLeague, selectedSeason])

    // fetchEvents(fixtures);


    function handleSelectLeague(item : LeagueResponse){
        //when the user clicks on a league, set the season to the season marked current
        item.seasons.forEach(season => season.current ? setSeason(season.year) : item);
        setLeague(item);
    }
    
    function handleSelectedSeason(year : number){
        setSeason(year);
    }



    return(
        <div className={`${selectedLeague ? 'lg:grid lg:grid-flow-col lg:grid-cols-15' : 'flex justify-center'}`}>
            <Suspense fallback={<Loading/>}>
                <DisplayLeagues leagues={filteredLeagues} selectedLeague={selectedLeague} handleSelectedLeague={handleSelectLeague}></DisplayLeagues>
            </Suspense>

            { selectedLeague &&
            <>
                    <LeagueStandings selectedSeason={selectedSeason} handleSeasonChange={handleSelectedSeason} standingsResponse={standingsResponse} availableSeasons={availableSeasons} selectedLeague={selectedLeague}></LeagueStandings>
                    <DisplayMatches league={selectedLeague} fixtures={fixtures}></DisplayMatches>
            </>
                }
        </div>
    )
    
}