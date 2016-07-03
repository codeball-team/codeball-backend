import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IconClock from 'react-icons/lib/io/ios-time-outline';
import PitchInfo from '../PitchInfo/PitchInfo';
import './GameInfo.scss';

export default class GameInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    pitch: PropTypes.object.isRequired,
    time: PropTypes.string.isRequired
  };

  render() {
    const {
      className,
      date,
      duration,
      pitch,
      time
    } = this.props;

    return (
      <div
        className={classNames(
          'game-info',
          className
        )}>
        <div title="Game date & time">
          <IconCalendar className="icon" />
          {date}, {time}
        </div>

        <div title="Game duration">
          <IconClock className="icon" />
          {duration} min
        </div>

        <PitchInfo pitch={pitch} />
      </div>
    );
  }
}
