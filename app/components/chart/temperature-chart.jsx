import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

const TemperatureChart = ({ data }) => {
    if (data.length === 0) {
        return null;
    }

    const processedData = {
        series: [
            {
                name: 'temperature',
                data: data.map(item => ({ x: item.created, y: item.temperature })),
            },
        ],
    };

    const options = {
        axisX: {
            type: Chartist.FixedScaleAxis,
            divisor: 12,
            labelInterpolationFnc: value => moment(value).format('HH'),
        },
        axisY: {
            low: 15,
            onlyInteger: true,
        },
        series: {
            temperature: {
                showPoint: false,
                showArea: true,
            },
        },

    };

    return (
        <ChartistGraph data={processedData} options={options} type="Line" />
    );
};

TemperatureChart.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
        roomId: React.PropTypes.number,
        temperature: React.PropTypes.number,
        created: React.PropTypes.object,
    })),
};

export default TemperatureChart;
