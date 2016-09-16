import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class GameDate extends Component {
  static propTypes = {
    date: PropTypes.string
  };

  render() {
    const { date } = this.props;

    return (
      <div className="ellipsis" title="Game date">
        <Icon name="calendar" />
        {date}
      </div>
    );
  }
}

export default BaseComponent(GameDate);
