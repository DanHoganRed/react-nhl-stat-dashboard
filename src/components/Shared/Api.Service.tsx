import axios, { AxiosResponse } from "axios";
import { ApiDivisionInfo, ApiStandings, ApiTeamInfo } from "./API.Model";
import { TeamStanding } from "./Standings.Model";

export const ApiService =
{
    GetTeamStats(start: string, end: string): Promise<AxiosResponse<ApiStandings>>
    {
        return axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate='+start+'&endDate='+end);
    },
    MapTeamStanding(apiModel: ApiStandings, teams: ApiTeamInfo): TeamStanding[]
    {
        let standings: TeamStanding[] = [];
        teams.teams.forEach(team => {
            standings.push({
                divisionID: team.division.id,
                teamIcon: '',
                teamId: team.id,
                teamName: team.name,
                totalGames: 1,
                standingResults:[{gameNumber: 0, points: 0}]
            });
        });
        apiModel.dates.forEach(date => {
            date.games.forEach(game => 
                {
                    let homeTeam = game.teams.home;
                    let awayTeam = game.teams.away;
                    
                    let homeWin = homeTeam.score > awayTeam.score;
                    // HomeTeam
                    AddData(standings, homeTeam.team.id, homeWin);
                    // AwayTeam
                    AddData(standings, awayTeam.team.id, !homeWin);
                });
        });
        return standings;
    },
    GetTeamsInfo(season: string): Promise<AxiosResponse<ApiTeamInfo>>
    {
        return axios.get('https://statsapi.web.nhl.com/api/v1/teams?season='+season);
    },
    GetDivisionsFromTeams(info: ApiTeamInfo): ApiDivisionInfo[]
    {
        let divisions: ApiDivisionInfo[] = [];
        info.teams.forEach(x => {
            if(!divisions.find(y => y.id === x.division.id))
            {
                divisions.push(x.division);
            }
        });
        return divisions;
    },
}

function AddData(standings: TeamStanding[], teamID: number, win: boolean)
{
    let results = standings.find(x => x.teamId === teamID)!.standingResults;
    let lastGame =  results[results.length - 1];
    results.push(
        {
            gameNumber: lastGame.gameNumber + 1,
            points: lastGame.points + (win ? 2: 0), 
        }
    );
}