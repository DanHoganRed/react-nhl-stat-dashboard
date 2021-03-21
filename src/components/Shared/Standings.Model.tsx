export interface TeamStanding {
    teamId: number,
    teamIcon: string,
    teamName: string,
    standingResults: GameStanding[],
    divisionID: number,
}

export interface GameStanding
{
    points: number,
    gameNumber: number 
}