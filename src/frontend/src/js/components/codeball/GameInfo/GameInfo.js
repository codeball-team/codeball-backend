import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';
import { PitchInfo } from 'components/codeball';
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
        <div className="ellipsis" title="Game date & time">
          <Icon name="calendar" />
          {date}, {time}
        </div>

        <div className="ellipsis" title="Game duration">
          <Icon name="clock" />
          {duration} min
        </div>

        <PitchInfo pitch={pitch} />
      </div>
    );
  }
}

export default BaseComponent(GameInfo);
