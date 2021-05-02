import React from 'react';
import Graph from '../Graph/Graph';
import { ApiDivisionInfo } from '../Shared/API.Model';
import { ApiService } from '../Shared/Api.Service';
import { TeamStanding } from '../Shared/Standings.Model';

export interface State {
  error: any;
  isLoaded: boolean;
  teams: TeamStanding[];
  divisions: ApiDivisionInfo[];
};

class Content extends React.Component {
  public state: State;
  private seasonStart: Date = new Date('Oct 1, 2020'); 
  private seasonEnd: Date = new Date('Aug 31, 2021'); 

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: [],
      divisions: []
    };
  }

  async componentDidMount() {
    let teams = await ApiService.GetTeamsInfo(this.seasonStart.getFullYear() + '' +this.seasonEnd.getFullYear());
    const stnds = await ApiService.GetTeamStats(formatDate(this.seasonStart), formatDate(this.seasonEnd));
    if(stnds && stnds.status === 200)
    {
      this.setState({
        error: null, 
        isLoaded: true, 
        teams: ApiService.MapTeamStanding(stnds.data, teams.data),
        divisions: ApiService.GetDivisionsFromTeams(teams.data)
      });
    }
    else
    {
      this.setState({
        error: {message: "Error Loading Data", status: stnds.status+':'+stnds.statusText}, 
        isLoaded: true, 
        teams: [],
        divisions: [],
      });
    }
  }

  render() {
    const { error, isLoaded, teams, divisions } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let rows: JSX.Element[] = [];
      divisions.forEach(x => {
        rows.push(<Graph standings={teams.filter(y => y.divisionID === x.id)} division={x}></Graph>);
      })
      return (
        <div>
          {rows}
        </div>
      );
    }
  }
}

function formatDate(date: Date)
{
  return date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
}

export default Content;