import React, { Component, PropTypes } from 'react';
import { formatRange } from 'utils';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class PitchCapacity extends Component {
  static propTypes = {
    maxNumberOfPlayers: PropTypes.number,
    minNumberOfPlayers: PropTypes.number
  };

  render() {
    const { minNumberOfPlayers, maxNumberOfPlayers } = this.props;
    const capacity = formatRange(minNumberOfPlayers, maxNumberOfPlayers);

    return (
      <div title="Pitch capacity">
        <Icon name="people" />
        {capacity}
      </div>
    );
  }
}

export default BaseComponent(PitchCapacity);
