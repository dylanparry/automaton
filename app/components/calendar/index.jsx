import React, { Component } from 'react';
import moment from 'moment';

export default class CalendarTile extends Component {
  constructor() {
    super();

    this.state = this.date;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(this.date);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Return the date split into an object
  get date() {
    const date = moment();

    return {
      day: date.format('D'),
      suffix: date.format('Do').slice(-2),
      month: date.format('MMMM'),
      time: date.format('HH:mm:ss'),
    };
  }

  render() {
    return (
      <div className="tile bg-teal fg-white">
        <div className="tile-content">
          <div style={{ marginTop: 35, textAlign: 'center' }}>
            <div style={{ fontSize: 50, fontWeight: 'bold' }}>{this.state.day}<sup>{this.state.suffix}</sup></div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.month}</div>
          </div>
          <span className="tile-badge text-shadow">{this.state.time}</span>
        </div>
      </div>
    );
  }
}
