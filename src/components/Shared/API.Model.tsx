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