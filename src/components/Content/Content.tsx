import React from 'react';
import Graph from '../Graph/Graph';
import { ApiService } from '../Shared/Api.Service';
import { TeamStanding } from '../Shared/Standings.Model';

export interface State {
  error: any;
  isLoaded: boolean;
  items: TeamStanding[];
};

class Content extends React.Component {
  public state: State;

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  async componentDidMount() {
    // comma seperate team ids, https://statsapi.web.nhl.com/api/v1/schedule?teamId=9,%2010&startDate=2021-01-01&endDate=2021-03-07
    // Make a request for a user with a given ID
    const stnds = await ApiService.GetTeamStats();
    if(stnds && stnds.status === 200)
    {
      this.setState({
        error: null, 
        isLoaded: true, 
        items: ApiService.MapTeamStanding(stnds.data)
      });
    }
    else
    {
      this.setState({
        error: {message: "Error Loading Data", status: stnds.status+':'+stnds.statusText}, 
        isLoaded: true, 
        items: []
      });
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Graph standings={items}/>
          <p>
            {JSON.stringify(items, null, 2)}
          </p>
        </div>
      );
    }
  }
}

export default Content;