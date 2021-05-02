import React from 'react';
import { ApiDivisionInfo } from '../Shared/API.Model';
import { TeamStanding } from '../Shared/Standings.Model';

function Graph(props: any) {
  const Chart = require('react-charts').Chart;
  const standings: TeamStanding[] = props.standings;
  const division: ApiDivisionInfo = props.division;

  const data = React.useMemo(
    () => 
    standings.map(
      stnding =>  {
        return {
        label: stnding.teamName,
        data: stnding.standingResults.map(result => { return {x: result.gameNumber, y: result.points};})
        };
      })
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

  const tooltip = {
      align: 'alignAuto',
      anchor: 'anchorBottom'
    }
 
  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div style={{
      width:'90%',
      height:'500px',
      margin: '30px',
      marginBottom: '50px',
    }}>
      <h3>
        {division.name}
      </h3>
      <div style={{
      width:'100%',
      height:'100%',
      }}>
        <Chart data={data} axes={axes} tooltip={tooltip}/>
      </div>
    </div>
  )

  return lineChart;
}
export default Graph;