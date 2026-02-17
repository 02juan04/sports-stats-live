import { LeagueResponse } from "@/types/leagueResponse"

interface props{
    leagues : LeagueResponse[] | undefined, 
    selectedLeague : LeagueResponse | null, 
    handleSelectedLeague : (item: LeagueResponse) => void
}

export default  function DisplayLeagues({ leagues, selectedLeague, handleSelectedLeague } : props){

    return (
        <div className="lg:h-full lg:col-span-3">
            <h2 className="text-xl text-center tracking-widest text-[2.5rem] pb-5 my-2">Leagues</h2>
            {
                leagues?.map((item : LeagueResponse) => 
                (
                    <div  className={`league-name-container border-x lg:border-l-3 lg:border-r-0 relative cursor-pointer tracking-wider ${selectedLeague?.league.id === item.league.id ? "bg-white/30 border-none" : ""}`} key={item.league.id} onClick={() => {
                        handleSelectedLeague(item);
                    }}>
                        <h3 className={`my-3 text-center p-5`}>{item.league.name}</h3>
                    </div>
                )
                )
            }
        </div>
    )
}


// hover:bg-gray-700 focus:bg-gray-500 active:bg-gray-500 cursor-pointer text-xl  }