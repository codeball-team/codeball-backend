import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';
import PitchInfo from '../PitchInfo/PitchInfo';
import './GameInfo.scss';

class GameInfo extends Component {
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
          <Icon name="calendar" />
          {date}, {time}
        </div>

        <div title="Game duration">
          <Icon name="clock" />
          {duration} min
        </div>

        <PitchInfo pitch={pitch} />
      </div>
    );
  }
}

export default BaseComponent(GameInfo);
