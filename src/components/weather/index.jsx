import React from 'react';
import dateformat from 'dateformat';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';

import { Icons } from '../../constants';

const metresPerSecondToMilesPerHour = speed => (speed * 2.237).toFixed(1);

const degreesToDirection = (degrees) => {
    if (degrees >= 348.75 && degrees < 11.25) {
        return 'Northerly';
    }
    if (degrees >= 11.25 && degrees < 33.75) {
        return 'North North Easterly';
    }
    if (degrees >= 33.75 && degrees < 56.25) {
        return 'North Easterly';
    }
    if (degrees >= 56.25 && degrees < 78.75) {
        return 'East North Easterly';
    }
    if (degrees >= 78.75 && degrees < 101.25) {
        return 'Easterly';
    }
    if (degrees >= 101.25 && degrees < 123.75) {
        return 'East South Easterly';
    }
    if (degrees >= 123.75 && degrees < 146.25) {
        return 'South Easterly';
    }
    if (degrees >= 146.25 && degrees < 168.75) {
        return 'South South Easterly';
    }
    if (degrees >= 168.75 && degrees < 191.25) {
        return 'Southerly';
    }
    if (degrees >= 191.25 && degrees < 213.75) {
        return 'South South Westerly';
    }
    if (degrees >= 213.75 && degrees < 236.25) {
        return 'South Westerly';
    }
    if (degrees >= 236.25 && degrees < 258.75) {
        return 'West South Westerly';
    }
    if (degrees >= 258.75 && degrees < 281.25) {
        return 'Westerly';
    }
    if (degrees >= 281.25 && degrees < 303.75) {
        return 'West North Westerly';
    }
    if (degrees >= 303.75 && degrees < 326.25) {
        return 'North Westerly';
    }
    if (degrees >= 326.25 && degrees < 348.75) {
        return 'North North Westerly';
    }

    return degrees;
};

const unixDateToTimeString = date => dateformat(new Date(date * 1000), 'HH:MM');

const Weather = ({ store }) => {
    if (store.weatherDataDaily === null || store.weatherDataCurrent === null) {
        return null;
    }

    const current = store.weatherDataCurrent;
    const daily = store.weatherDataDaily.list[0];

    const daytime = current.dt > current.sys.sunrise && current.dt < current.sys.sunset;
    const icon = daytime
        ? current.weather[0].icon.replace('n', 'd')
        : current.weather[0].icon.replace('d', 'n');

    return (
        <div>
            <ul className="breadcrumbs2">
                <li><Link to="/">{Icons.Home}</Link></li>
                <li><Link to="/weather">Weather</Link></li>
            </ul>

            <h2>Weather for {current.name}</h2>

            <div className="grid">
                <div className="row cells3">
                    <div className="cell" style={{ textAlign: 'center' }}>
                        <img src={`./icons/weather/${icon}.png`} alt="" style={{ margin: 10 }} />
                    </div>

                    <div className="cell colspan2">
                        <h3>
                            {current.main.temp.toFixed(1)}°C
                            <small>
                                {daily.temp.min.toFixed(0)}°C
                                {Icons.RangeArrow}
                                {daily.temp.max.toFixed(0)}°C
                            </small>
                        </h3>

                        <p>
                            {current.weather[0].description.substr(0, 1).toUpperCase()}
                            {current.weather[0].description.substr(1)}
                        </p>

                        <p>
                            Humidity: {current.main.humidity}%,
                            Pressure: {current.main.pressure}hPa
                        </p>

                        <p>
                            Wind: {metresPerSecondToMilesPerHour(current.wind.speed)}mph,
                            Direction: {degreesToDirection(current.wind.deg)}
                        </p>

                        {current.rain && <p>{current.rain['3h']}mm of rain in last 3 hours</p>}

                        {current.snow && <p>{current.snow['3h']}mm of snow in last 3 hours</p>}

                        <p>
                            Sunrise: {unixDateToTimeString(current.sys.sunrise)},
                            Sunset: {unixDateToTimeString(current.sys.sunset)}
                        </p>

                        <p>Updated: {unixDateToTimeString(current.dt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Weather.propTypes = {
    store: React.PropTypes.shape({
        weatherData: React.PropTypes.object,
    }),
};

export default inject('store')(observer(Weather));
