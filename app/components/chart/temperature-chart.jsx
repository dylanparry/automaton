import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

import AxisTitle from '../../utils/chartist-plugin-axistitle';

const TemperatureChart = ({ data, currentTemperature }) => {
  if (data.length === 0) {
    return null;
  }

  const rounded = data.map(item => ({ x: item.created, y: Math.round(item.temperature) }));

  const processedData = {
    series: [
      {
        name: 'temperature',
        data: [
          { x: moment().subtract(1, 'd').toDate(), y: rounded[0].y },
          ...rounded.slice(1),
          { x: new Date(), y: Math.round(currentTemperature) },
        ],
      },
    ],
  };
  // Get the high and low points for the chart
  const highest = Math.max(...rounded.map(item => item.y)) + 1;
  const lowest = Math.min(...rounded.map(item => item.y)) - 1;

  const options = {
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 24,
      labelInterpolationFnc: value => moment(value).format('HH'),
    },
    axisY: {
      low: lowest,
      high: highest,
      onlyInteger: true,
    },
    series: {
      temperature: {
        showPoint: false,
        showArea: true,
      },
    },
    plugins: [
      AxisTitle({
        axisY: {
          axisTitle: 'Temp (°C)',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 17,
          },
          flipTitle: true,
        },
      }),
    ],
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <ChartistGraph data={processedData} options={options} type="Line" />
      <div style={{ position: 'relative', marginTop: -10 }}>Time of Day</div>
    </div>
  );
};

TemperatureChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    roomId: React.PropTypes.number,
    temperature: React.PropTypes.number,
    created: React.PropTypes.object,
  })),
  currentTemperature: React.PropTypes.number,
};

export default TemperatureChart;
