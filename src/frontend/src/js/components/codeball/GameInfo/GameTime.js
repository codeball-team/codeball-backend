import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class GameTime extends Component {
  static propTypes = {
    time: PropTypes.string
  };

  render() {
    const { time } = this.props;

    return (
      <div className="ellipsis" title="Game time">
        <Icon name="clock" />
        {time}
      </div>
    );
  }
}

export default BaseComponent(GameTime);
