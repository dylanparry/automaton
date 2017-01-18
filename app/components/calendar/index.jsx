import React, { Component } from 'react';
import moment from 'moment';

// Return the date split into an object
const getDate = () => {
  const date = moment();

  return {
    day: date.format('D'),
    suffix: date.format('Do').slice(-2),
    month: date.format('MMMM'),
    time: date.format('HH:mm:ss'),
  };
};

const style = {
  container: {
    marginTop: 35,
    textAlign: 'center',
  },

  month: {
    fontSize: 50,
    fontWeight: 'bold',
  },

  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default class CalendarTile extends Component {
  constructor() {
    super();

    this.state = getDate();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(getDate());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="tile bg-teal fg-white">
        <div className="tile-content">
          <div style={style.container}>
            <div style={style.month}>{this.state.day}<sup>{this.state.suffix}</sup></div>
            <div style={style.day}>{this.state.month}</div>
          </div>
          <span className="tile-badge text-shadow">{this.state.time}</span>
        </div>
      </div>
    );
  }
}
