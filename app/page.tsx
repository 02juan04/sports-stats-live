import fetchLeagues from "@/lib/fetchLeagues";
import fetchStandings from "@/lib/fetchStandings";
import {Suspense} from "react"
import Loading from "./loading";
import LandingPage from "./landingPage";
import { LeagueResponse } from "@/types/leagueResponse";


export default async function Home() {
  const filteredLeagues : LeagueResponse[] = await fetchLeagues();

  function handleFetchStandings(leagueID : number, season : number){
    fetchStandings(leagueID, season);
  }

  return (
    <div className="border w-full h-full">
      <Suspense fallback={<Loading/>}>
        <LandingPage filteredLeagues={filteredLeagues} handleFetchStandings={handleFetchStandings}></LandingPage>
      </Suspense>
    </div>
  );
}
