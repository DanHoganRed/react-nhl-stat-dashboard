export interface TeamStanding {
    teamId: number,
    teamIcon: string,
    teamName: string,
    standingResults: GameStanding[],
    divisionID: number,
    totalGames: number,
}

export interface GameStanding
{
    points: number,
    gameNumber: number 
}