import { LeagueResponse } from "@/types/leagueResponse"
import Image from "next/image"

interface props{
    leagues : LeagueResponse[] | undefined, 
    selectedLeague : LeagueResponse | null, 
    handleSelectedLeague : (item: LeagueResponse) => void
}

export default  function DisplayLeagues({ leagues, selectedLeague, handleSelectedLeague } : props){

    return (
        <div className={`${selectedLeague ? 'lg:h-full lg:col-span-3' : 'w-1/3'}`}>
            <div id="a" className='-z-1 absolute w-full h-[170vh] top-0 left-0 bg-gradient-to-tr from-[#440f50]/15 via-[#595656]/30 to-[#440f50]/15'></div>
            <h2 className="text-xl text-center tracking-widest text-[2.5rem] mb-20">Leagues</h2>
            {
                leagues?.map((item : LeagueResponse) => 
                (
                    <div  className={`league-name-container my-3 text-center p-5 lg:border-l-3 lg:border-r-0 relative cursor-pointer tracking-wider ${selectedLeague?.league.id === item.league.id ? "bg-white/30 border-none rounded-xl text-xl tracking-widest shadow" : "league-not-selected"}`} key={item.league.id} onClick={() => {
                        handleSelectedLeague(item);
                    }}>
                        <div className="relative w-10 h-10 -z-1 left-50 top-5">
                        <Image src={item.league.logo} alt={`${item.league.name} logo`} fill className="object-contain absolute"></Image>
                        </div>
                        <h3>{item.league.name}</h3>
                    </div>
                )
                )
            }
        </div>
    )
}