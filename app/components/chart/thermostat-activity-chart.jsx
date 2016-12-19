import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

const ThermostatActivityChart = ({ data, currentStatus }) => {
  if (data.length === 0) {
    return null;
  }

  const processedData = {
    series: [
      {
        name: 'thermostat',
        data: [
          // Insert a record 24 hours ago set to the opposite of the first value in the dataset
          { x: moment().subtract(1, 'd').toDate(), y: data[0] === 0 ? 1 : 0 },
          ...data.map(item => ({ x: item.created, y: item.status })),
          { x: new Date(), y: currentStatus },
        ],
      },
    ],
  };

  const options = {
    height: '300px',
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 24,
      labelInterpolationFnc: value => moment(value).format('HH'),
    },
    axisY: {
      low: 0,
      high: 1,
      onlyInteger: true,
      labelInterpolationFnc: () => '', // Blank labels
    },
    series: {
      thermostat: {
        showPoint: false,
        showArea: true,
        showLine: false,
        lineSmooth: Chartist.Interpolation.step(),
      },
    },
  };

  return (
    <div style={{ textAlign: 'center', marginLeft: -35 }} className="thermostat-activity-chart">
      <ChartistGraph data={processedData} options={options} type="Line" />
      <div style={{ position: 'relative', marginTop: -10 }}>Time of Day – Coloured sections denote period when heating was on</div>
    </div>
  );
};

ThermostatActivityChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    state: React.PropTypes.number,
    created: React.PropTypes.object,
  })),
  currentStatus: React.PropTypes.number,
};

export default ThermostatActivityChart;
