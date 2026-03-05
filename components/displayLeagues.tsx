import { LeagueResponse } from "@/types/leagueResponse"
import Image from "next/image"
import { Fragment } from "react/jsx-runtime";

interface props{
    leagues : LeagueResponse[] | undefined, 
    selectedLeague : LeagueResponse | null, 
    handleSelectedLeague : (item: LeagueResponse) => void
}

export default  function DisplayLeagues({ leagues, selectedLeague, handleSelectedLeague } : props){


    //TODO 
    // implement this with the reduce
    const countries : Array<string>= [];
    leagues?.forEach(item => countries.includes(item.country.name) ? item : countries.push(item.country.name));
    countries.sort();

    const groupedleagues = countries.map(country => {
        const leaguesInCountry = leagues?.filter(item => item.country.name === country);
        return {country, leagues : leaguesInCountry}
    })

    return (
        <div id="leagues-section" className={`${selectedLeague ? 'lg:h-full lg:col-span-3' : ' lg:w-1/3 tracking-widest'}`}>
            <h2 
                id="leagues-section-header" 
                className="bg-[var(--dashboard-card-headers)] shadow-md  mt-10 lg:mt-0 mb-10 lg:mb-20  w-full text-center py-3 px-5 rounded-lg 
                            text-[1.2rem] xl:text-[1.8rem] tracking-wider gap-3 main-title"> 
                {selectedLeague ? 'Leagues' : 'Select a League'}
            </h2>
            {
                groupedleagues.map((item, index) => (
                    <Fragment key={index}>
                        <div className="secondary-title">{item.country}</div>
                        {
                           item.leagues?.map(item => (
                            <Fragment key={item.league.id}>
                                <div
                                    className={`league-card selectable dashboard-card bg-[var(--dashboard-card-color)] my-3
                                        text-center p-5 relative cursor-pointer tracking-wider shadow-lg rounded-lg  duration-150
                                        ${selectedLeague?.league.id === item.league.id ? "ring ring-indigo-600 scale-105 bg-gray-600" : "hover:scale-105 hover:bg-gray-700"}`}
                                        onClick={() => {handleSelectedLeague(item);}}>
                                <div className={`-z-1 lg:z-1 absolute w-10 h-10 ${selectedLeague ? ''  : 'left-10'}`}>
                                    <Image src={item.league.logo} alt={`${item.league.name} logo`} fill className="object-contain"></Image>
                                </div>
                                    <h3 className="text-xl main-title">{item.league.name}</h3>
                                </div>
                            </Fragment>
                           ))
                        }
                    </Fragment>
                ))




                // leagues?.map((item : LeagueResponse) => (
                //     <Fragment key={item.league.id}>
                //     <div tabIndex={0} className={`league-card selectable dashboard-card bg-[var(--dashboard-card-color)] my-3 text-center p-5 relative cursor-pointer tracking-wider shadow-lg rounded-lg hover:scale-105 duration-150 ${selectedLeague?.league.id === item.league.id ? "ring ring-green-500 scale-105 bg-gray-500" : "league-not-selected"}`}  onClick={() => {
                //         handleSelectedLeague(item);
                //     }}>
                //         <div className={`absolute w-10 h-10`}>
                //             <Image src={item.league.logo} alt={`${item.league.name} logo`} fill className="object-contain"></Image>
                //         </div>
                //         <h3 className="text-xl main-title">{item.league.name}</h3>
                //     </div>
                //     </Fragment>
                //     )
                // )
            }
        </div>
        )
}