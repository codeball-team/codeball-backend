import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class GameDuration extends Component {
  static propTypes = {
    duration: PropTypes.number
  };

  render() {
    const { duration } = this.props;

    return (
      <div className="ellipsis" title="Game duration">
        <Icon name="hourglass" />
        {duration} min
      </div>
    );
  }
}

export default BaseComponent(GameDuration);
