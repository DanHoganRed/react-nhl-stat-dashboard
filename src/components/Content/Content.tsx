import React from 'react';
import { TeamStanding } from '../Shared/Standings.Model';

export interface State {
  error: any;
  isLoaded: boolean;
  items: any;
};

class Content extends React.Component {
  public state: State;
  public data: TeamStanding[];

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.data = [];
  }

  componentDidMount() {
    const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get('https://statsapi.web.nhl.com/api/v1/schedule?teamId=9&startDate=2021-01-01&endDate=2021-03-07')
      .then((response: any) => {
        // handle success
        this.setState(
          {
            error: null,
            isLoaded: true,
            items: response.data
          });
      })
      .catch((error: any) => {
        // handle error
        this.setState(
          {
            error: error,
            isLoaded: true,
            items: null
          });
      });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p>
          {JSON.stringify(items, null, 2)}
        </p>
      );
    }
  }
}

export default Content;