import React, { Component, PropTypes } from 'react';
import { PITCH_TYPE_STRING } from 'constants';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class PitchType extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  render() {
    const { type } = this.props;

    return (
      <div className="ellipsis" title="Pitch type">
        <Icon name="layers" />
        <a href="http://www.worldsoccershop.com/buyers-guide-boots.html">
          {PITCH_TYPE_STRING[type]}
        </a>
      </div>
    );
  }
}

export default BaseComponent(PitchType);
