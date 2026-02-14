export interface FixtureResponse{
    fixture : {
        id : number,
        referee : string | null,
        timezone : string,
        date : string,
        timestamp : number,
        periods : {
            first : number,
            second : number | null
        },
        venue : {
            id : number,
            name : string,
            city : string
        }
        status : {
            long : string,
            short : string,
            elapsed : number,
            extra : number | null
        }
    }
    league : {
        id : number,
        name : string,
        country : string,
        logo : string,
        flag : string,
        season : number,
        round : string,
    }
    teams : {
        home : {
            id : number,
            name : string,
            logo : string,
            winner : false
        }
        away : {
            id : number,
            name : string,
            logo : string,
            winner : false
        }
    }
    goals : {
        home : number,
        away : number
    }
    score : {
        halftime : {
            home: number | null,
            away : number | null
        }
        fulltime : {
            home: number | null,
            away : number | null
        }
        extratime : {
            home: number | null,
            away : number | null
        }
        penalty : {
            home: number | null,
            away : number | null
        }
    }
}