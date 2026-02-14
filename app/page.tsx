import fetchLeagues from "@/lib/fetchLeagues";
import fetchAvailableSeasons from "@/lib/fetchLeagueSeasons";

import { AvailableSeasonsResponse } from "@/types/leagues-Seasons-Response";

import LandingPage from "./landingPage";


export default async function Home() {
  const filteredLeagues = await fetchLeagues();
  const availableSeasons : AvailableSeasonsResponse = await fetchAvailableSeasons();

  return (
    <div className="w-full h-fit p-10">
        <LandingPage filteredLeagues={filteredLeagues} availableSeasons={availableSeasons}></LandingPage>
    </div>
  );
}
