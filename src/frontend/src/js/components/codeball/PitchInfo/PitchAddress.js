import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class PitchAddress extends Component {
  static propTypes = {
    address: PropTypes.string
  };

  render() {
    const { address } = this.props;
    const mapsUrl = `https://www.google.com/maps/?q=${encodeURIComponent(address)}`;

    return (
      <div className="ellipsis" title="Pitch address">
        <Icon name="location" />
        <a href={mapsUrl}>
          {address}
        </a>
      </div>
    );
  }
}

export default BaseComponent(PitchAddress);
