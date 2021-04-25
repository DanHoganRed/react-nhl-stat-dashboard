import React from 'react';
import { TeamStanding } from '../Shared/Standings.Model';

function Graph(props: any) {
  const Chart = require('react-charts').Chart;
  const standings: TeamStanding[] = props.standings;
  const graphStandings = standings.map(
    stnding =>  {
      return {
      label: stnding.teamName,
      data: stnding.standingResults.map(result => { return {x: result.gameNumber, y: result.points};})
      };
    });

  const data = React.useMemo(
    () => 
      graphStandings
    ,
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div style={{
      width:'90%',
      height:'500px',
      margin: '30px'
    }}>
      <Chart data={data} axes={axes} />
    </div>
  )

  return lineChart;
}
export default Graph;