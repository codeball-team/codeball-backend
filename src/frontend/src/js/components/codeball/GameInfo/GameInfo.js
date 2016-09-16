import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { PitchInfo } from 'components/codeball';
import GameDate from './GameDate';
import GameDuration from './GameDuration';
import GameTime from './GameTime';
import './GameInfo.scss';

class GameInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired,
    pitch: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      game: {
        date,
        duration,
        time
      },
      pitch
    } = this.props;

    return (
      <div
        className={classNames(
          'game-info',
          className
        )}>
        <GameDate date={date} />
        <GameTime time={time} />
        <GameDuration duration={duration} />
        <PitchInfo pitch={pitch} />
      </div>
    );
  }
}

export default BaseComponent(GameInfo);
