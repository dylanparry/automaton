import React, { Component } from 'react';
import dateformat from 'dateformat';

export default class CalendarTile extends Component {
  static timer;

  constructor() {
    super();

    const date = new Date();

    this.state = {
      day: dateformat(date, 'd'),
      suffix: dateformat(date, 'S'),
      month: dateformat(date, 'mmmm'),
      time: dateformat(date, 'HH:MM:ss'),
    };
  }

  componentDidMount() {
    CalendarTile.timer = setInterval(() => {
      const date = new Date();

      this.setState({
        day: dateformat(date, 'd'),
        suffix: dateformat(date, 'S'),
        month: dateformat(date, 'mmmm'),
        time: dateformat(date, 'HH:MM:ss'),
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
