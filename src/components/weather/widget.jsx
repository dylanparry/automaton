import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

const Widget = ({ store }) => {
    if (store.weatherDataCurrent === null) {
        return null;
    }

    const daytime = store.weatherDataCurrent.dt > store.weatherDataCurrent.sys.sunrise
        && store.weatherDataCurrent.dt < store.weatherDataCurrent.sys.sunset;

    const icon = daytime
        ? store.weatherDataCurrent.weather[0].icon.replace('n', 'd') :
        store.weatherDataCurrent.weather[0].icon.replace('d', 'n');

    const className = daytime ? 'tile bg-lightBlue fg-white' : 'tile bg-grayDark fg-white';

    return (
        <Link to="/weather">
            <div className={className}>
                <div className="tile-content iconic">
                    <div className="icon" style={{ width: 96, height: 96, marginTop: -48, marginLeft: -48 }}>
                        <img src={`./icons/weather/${icon}.png`} alt="" />
                    </div>
                    <span className="tile-label text-shadow">Weather</span>
                    <span className="tile-badge text-shadow">{store.weatherDataCurrent.main.temp.toFixed(1)}°C</span>
                </div>
            </div>
        </Link>
    );
};

Widget.propTypes = {
    store: React.PropTypes.shape({
        weatherDataCurrent: React.PropTypes.object,
    }),
};

export default inject('store')(observer(Widget));
