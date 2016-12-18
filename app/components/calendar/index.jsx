import React, { Component } from 'react';
import moment from 'moment';

export default class CalendarTile extends Component {
  static timer;

  constructor() {
    super();

    const date = moment();

    this.state = {
      day: date.format('D'),
      suffix: date.format('Do').slice(-2),
      month: date.format('MMMM'),
      time: date.format('HH:mm:ss'),
    };
  }

  componentDidMount() {
    CalendarTile.timer = setInterval(() => {
      const date = moment();

      this.setState({
        day: date.format('D'),
        suffix: date.format('Do').slice(-2),
        month: date.format('MMMM'),
        time: date.format('HH:mm:ss'),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(CalendarTile.timer);
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
