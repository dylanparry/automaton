import React, { Component } from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

class TemperatureChart extends Component {
    render() {
        if (this.props.data.length === 0) {
            return null;
        }

        const data = {
            series: [
                {
                    name: 'temperature',
                    data: this.props.data.map(item => ({ x: item.created, y: item.temperature })),
                },
            ],
        };

        const options = {
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 2,
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
                    lineSmooth: Chartist.Interpolation.simple({
                        tension: 0.5,
                    }),
                },
            },

        };

        return (
            <ChartistGraph data={data} options={options} type="Line" />
        );
    }
}

export default TemperatureChart;
