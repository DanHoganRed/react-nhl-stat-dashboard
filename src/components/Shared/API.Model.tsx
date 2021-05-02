
export interface ApiStandings
{
    totalGames: number,
    dates : 
    [{
        date: Date,
        games:[{
            season: string,
            gameType: string,
            teams: {
                away:
                {
                    leagueRecord:
                    {
                        ot: number,
                        home: number,
                        away: number,
                    },
                    score: number,
                    team:
                    {
                        id: number,
                        name: string,
                    }
                },
                home:
                {
                    leagueRecord:
                    {
                        ot: number,
                        home: number,
                        away: number,
                    },
                    score: number,
                    team:
                    {
                        id: number,
                        name: string,
                    }
                }
            }
        }]
    }]
}

export interface ApiTeamInfo
{
    teams: {
        id: number,
        name: string,
        abbreviation: string,
        teamName: string,
        division: ApiDivisionInfo,
        conference: {
            id: number,
            name: string, 
            link: string,
        },
        active: boolean
    }[],
}

export interface ApiDivisionInfo
{
    id: number,
    name: string,
    nameShort: string,
    link: string,
    abbreviation: string,
}