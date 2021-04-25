import axios, { AxiosResponse } from "axios";
import { ApiStandings } from "./API.Model";
import { TeamStanding } from "./Standings.Model";

export const ApiService =
{
    GetTeamStats(): Promise<AxiosResponse<ApiStandings>>
    {
        return axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2021-01-01&endDate=2021-03-07');
    },
    MapTeamStanding(apiModel: ApiStandings): TeamStanding[]
    {
        let standings: TeamStanding[] = [];
        let teamIds: number[] = [];
        apiModel.dates.forEach(date => {
            date.games.forEach(game => 
                {
                    let homeTeam = game.teams.home;
                    let awayTeam = game.teams.away;
                    
                    let homeWin = homeTeam.score > awayTeam.score;
                    if(teamIds.includes(homeTeam.team.id))
                    {
                        let results = standings.find(x => x.teamId === homeTeam.team.id)!.standingResults;
                        let lastGame = results[results?.length - 1];
                        lastGame = lastGame ? lastGame: {gameNumber: 1, points: 0};
                        results.push(
                            {
                                gameNumber: lastGame?.gameNumber + 1,
                                points: lastGame?.points + (homeWin ? 1: 0), 
                            }
                        );
                    }
                    else
                    {
                        teamIds.push(homeTeam.team.id);
                        standings.push({
                            divisionID: 0,
                            teamIcon: '',
                            teamId: homeTeam.team.id,
                            teamName: homeTeam.team.name,
                            totalGames: 1,
                            standingResults:[{
                                gameNumber: 1,
                                points: (homeWin ? 1: 0)
                            }]
                        });
                    }
                    if(teamIds.includes(awayTeam.team.id))
                    {
                        let results = standings.find(x => x.teamId === awayTeam.team.id)!.standingResults;
                        let lastGame = results[results?.length - 1];
                        lastGame = lastGame ? lastGame: {gameNumber: 1, points: 0};
                        results.push(
                            {
                                gameNumber: lastGame?.gameNumber + 1,
                                points: lastGame?.points + (homeWin ? 0: 1), 
                            }
                        );
                    }
                    else
                    {
                        teamIds.push(awayTeam.team.id);
                        standings.push({
                            divisionID: 0,
                            teamIcon: '',
                            teamId: awayTeam.team.id,
                            teamName: awayTeam.team.name,
                            totalGames: 1,
                            standingResults:[{
                                gameNumber: 1,
                                points: (homeWin ? 0: 1)
                            }]
                        });
                    }
                });
        });
        return standings;
    }
}
