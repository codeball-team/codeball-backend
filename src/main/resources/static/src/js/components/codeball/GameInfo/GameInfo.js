import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IconClock from 'react-icons/lib/io/ios-time-outline';
import PitchInfo from '../PitchInfo/PitchInfo';
import { Section } from 'components/ui';
import './GameInfo.scss';

export default class GameInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    pitchName: PropTypes.string.isRequired,
    pitchType: PropTypes.number,
    pitchAddress: PropTypes.string.isRequired,
    pitchUrl: PropTypes.string,
    pitchMinNumberOfPlayers: PropTypes.number.isRequired,
    pitchMaxNumberOfPlayers: PropTypes.number.isRequired
  };

  render() {
    const {
      className,
      date,
      time,
      duration,
      pitchName,
      pitchType,
      pitchAddress,
      pitchUrl,
      pitchMinNumberOfPlayers,
      pitchMaxNumberOfPlayers
    } = this.props;

    return (
      <Section
        title={pitchName}
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

        <PitchInfo
          address={pitchAddress}
          url={pitchUrl}
          type={pitchType}
          minNumberOfPlayers={pitchMinNumberOfPlayers}
          maxNumberOfPlayers={pitchMaxNumberOfPlayers} />
      </Section>
    );
  }
}
