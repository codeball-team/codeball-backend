import React, { Component, PropTypes } from 'react';
import IconLocation from 'react-icons/lib/io/ios-location';
import IconWorld from 'react-icons/lib/io/ios-world-outline';
import IconPeople from 'react-icons/lib/io/ios-people';
import IconCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IconClock from 'react-icons/lib/io/ios-clock-outline';
import './MatchInfo.scss';

export default class MatchInfo extends Component {
  static propTypes = {
    dateTime: PropTypes.object.isRequired,
    duration: PropTypes.object.isRequired,
    pitchName: PropTypes.string.isRequired,
    pitchAddress: PropTypes.string.isRequired,
    pitchUrl: PropTypes.string.isRequired,
    pitchMinNumberOfPlayers: PropTypes.number.isRequired,
    pitchMaxNumberOfPlayers: PropTypes.number.isRequired
  };

  render() {
    const {
      dateTime,
      duration,
      pitchName,
      pitchAddress,
      pitchUrl,
      pitchMinNumberOfPlayers,
      pitchMaxNumberOfPlayers
    } = this.props;

    return (
      <div className="match-info">
        <div className="title">
          {pitchName}
        </div>
        <div className="details">
          <IconCalendar className="icon" />
          {dateTime.format('YYYY-MM-DD, HH:mm')}
        </div>
        <div className="details">
          <IconClock className="icon" />
          {duration.as('minutes')} min
        </div>
        <div className="details">
          <IconLocation className="icon" />
          <a href={`https://www.google.com/maps/?q=${pitchAddress}`}>
            {pitchAddress}
          </a>
        </div>
        <div className="details">
          <IconWorld className="icon" />
          <a href={pitchUrl}>
            {pitchUrl.match(/(https?:\/\/[^/]*)/)[0]}
          </a>
        </div>
        <div className="details">
          <IconPeople className="icon" />
          {
            pitchMinNumberOfPlayers === pitchMaxNumberOfPlayers
              ? `${pitchMinNumberOfPlayers}`
              : `${pitchMinNumberOfPlayers} - ${pitchMaxNumberOfPlayers}`
          }
        </div>
      </div>
    );
  }
}
