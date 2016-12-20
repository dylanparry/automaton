import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

const style = {
  container: {
    textAlign: 'center',
  },

  label: {
    position: 'relative',
    marginTop: -10,
  },
};

const ThermostatActivityChart = ({ data, currentStatus }) => {
  if (data.length === 0) {
    return null;
  }

  const processedData = {
    series: [
      {
        name: 'thermostat',
        data: [
          // Ensure data starts on a full hour
          { x: moment().subtract(1, 'd').minutes(0).toDate(), y: data[0] === 0 ? 1 : 0 },

          // The real data
          ...data.map(item => ({ x: item.created, y: item.status })),

          // A value for now
          { x: moment().toDate(), y: currentStatus },

          // Pad out data to next full hour
          { x: moment().add(1, 'h').minutes(0).toDate(), y: 0 },
        ],
      },
    ],
  };

  const options = {
    height: '300px',
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 25,
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
    <div style={style.container} className="thermostat-activity-chart">
      <ChartistGraph data={processedData} options={options} type="Line" />
      <div style={style.label}>Time of Day – Coloured sections denote periods when heating was on</div>
    </div>
  );
};

ThermostatActivityChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    state: React.PropTypes.number,
    created: React.PropTypes.object,
  })).isRequired,
  currentStatus: React.PropTypes.number.isRequired,
};

export default ThermostatActivityChart;
