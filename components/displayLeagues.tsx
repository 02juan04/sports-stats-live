import { LeagueResponse } from "@/types/leagueResponse"

interface props{
    leagues : LeagueResponse[] | undefined, 
    selectedLeague : LeagueResponse | null, 
    handleSelectedLeague : (item: LeagueResponse) => void
}

export default  function DisplayLeagues({ leagues, selectedLeague, handleSelectedLeague } : props){

    return (
        <div className={`${selectedLeague ? 'lg:h-full lg:col-span-3' : 'w-1/2'}`}>
            <h2 className="text-xl text-center tracking-widest text-[2.5rem] mb-20">Leagues</h2>
            {
                leagues?.map((item : LeagueResponse) => 
                (
                    <div  className={`league-name-container border-x my-3 text-center p-5 lg:border-l-3 lg:border-r-0 relative cursor-pointer tracking-wider ${selectedLeague?.league.id === item.league.id ? "bg-white/30 border-none rounded-xl text-xl tracking-widest shadow" : "league-not-selected"}`} key={item.league.id} onClick={() => {
                        handleSelectedLeague(item);
                    }}>
                        <h3>{item.league.name}</h3>
                    </div>
                )
                )
            }
        </div>
    )
}