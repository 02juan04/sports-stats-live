import { LeagueResponse } from "@/types/leagueResponse"
import Image from "next/image"

interface props{
    leagues : LeagueResponse[] | undefined, 
    selectedLeague : LeagueResponse | null, 
    handleSelectedLeague : (item: LeagueResponse) => void
}

export default  function DisplayLeagues({ leagues, selectedLeague, handleSelectedLeague } : props){

    return (
        <div className={`${selectedLeague ? 'lg:h-full lg:col-span-3' : 'w-1/5'}`}>
            <h2 id="leagues-section-header" className="dashboard-card shadow-md mb-20  w-full text-center py-3 px-5 rounded-lg text-[1.2rem] xl:text-[1.6rem] tracking-wider gap-3">{selectedLeague ? 'Leagues' : 'Select a League'}</h2>
            {
                leagues?.map((item : LeagueResponse) => 
                (
                    <div className={`league-card dashboard-card my-3 text-center p-5 relative cursor-pointer tracking-wider shadow-lg rounded-lg hover:bg-gradient-to-tr hover:from-[#440f50]/15 hover:via-[#595656]/30 hover:to-[#440f50]/15 hover:scale-105 active:bg-black duration-150 ${selectedLeague?.league.id === item.league.id ? "scale-103" : "league-not-selected"}`} key={item.league.id} onClick={() => {
                        handleSelectedLeague(item);
                    }}>
                        <div className={`absolute w-10 h-10`}>
                            <Image src={item.league.logo} alt={`${item.league.name} logo`} fill className="object-contain"></Image>
                        </div>
                        <h3 className="text-xl">{item.league.name}</h3>
                    </div>
                )
                )
            }
        </div>
    )
}