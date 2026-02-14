'use client'

import DisplayLeagues from "@/components/displayLeagues"
import LeagueStandings from "@/components/LeagueStandings"
import DisplayMatches from "@/components/displayMatches"

import { LeagueResponse } from "@/types/leagueResponse"
import { StandingsResponse } from "@/types/standingsResponse"
import { AvailableSeasonsResponse } from "@/types/leagues-Seasons-Response"
import { FixtureResponse } from "@/types/fixturesResponse"

import fetchFixtures from "@/lib/fetchFixtures"
import fetchStandings from "@/lib/fetchStandings"

import { useEffect, useState, Suspense } from "react"

import Loading from "./loading"


export default function LandingPage({filteredLeagues, availableSeasons} : {filteredLeagues : LeagueResponse[] | undefined , availableSeasons : AvailableSeasonsResponse}){
    const [selectedLeague, setLeague] = useState<LeagueResponse | null>(null);
    const [selectedSeason, setSeason] = useState<number | null>(2024);
    const [standingsResponse, setStandingResponse] = useState<StandingsResponse[] | null>(null);
    const [fixtures, setFixtures] = useState<FixtureResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        //if we dont have both states, return
        console.log("We dont have selectedLeague and season selected")
        if(!selectedLeague || !selectedSeason) return;
        console.log("we have both season and league selected");


        async function getStandings(selectedLeague : LeagueResponse, selectedSeason : number){
            const standings : StandingsResponse[] = await fetchStandings(selectedLeague, selectedSeason)
            setStandingResponse(standings);
            setLoading(false);
        }

        getStandings(selectedLeague, selectedSeason);

        async function getFixtures(selectedLeague : LeagueResponse, selectedSeason : number){
            const fixtureResponse : FixtureResponse[] = await fetchFixtures(selectedLeague, selectedSeason);
            setFixtures(fixtureResponse);
        }
        
        getFixtures(selectedLeague, selectedSeason);

    },[selectedLeague, selectedSeason])


    function handleSelectLeague(item : LeagueResponse){
        setLeague(item);
    }
    
    function handleSelectedSeason(year : number){
        console.log("season was changed");
        setSeason(year);
    }



    return(
        <div className="flex flex-row w-full justify-center">
            <Suspense fallback={<Loading/>}>
                <DisplayLeagues leagues={filteredLeagues} selectedLeague={selectedLeague} handleSelectedLeague={handleSelectLeague}></DisplayLeagues>
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <LeagueStandings selectedSeason={selectedSeason} handleSeasonChange={handleSelectedSeason} standingsResponse={standingsResponse} availableSeasons={availableSeasons} selectedLeague={selectedLeague}></LeagueStandings>
            </Suspense>
            <DisplayMatches league={selectedLeague} fixtures={fixtures}></DisplayMatches>
        </div>
    )
    
}