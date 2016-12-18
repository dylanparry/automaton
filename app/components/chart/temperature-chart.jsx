import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

import AxisTitle from '../../utils/chartist-plugin-axistitle';

// Rounds a number to the nearest 0.5 value
const roundToHalf = number => Math.round(number * 2) / 2;

const TemperatureChart = ({ data, currentTemperature }) => {
    if (data.length === 0) {
        return null;
    }

    const processedData = {
        series: [
            {
                name: 'temperature',
                data: Object.assign(
                    data.map(item => ({ x: item.created, y: roundToHalf(item.temperature) })),
                    { x: new Date(), y: roundToHalf(currentTemperature) },
                ),
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
