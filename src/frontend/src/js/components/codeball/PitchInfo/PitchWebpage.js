import React, { Component, PropTypes } from 'react';
import { getDomain } from 'utils';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';

class PitchWebpage extends Component {
  static propTypes = {
    url: PropTypes.string
  };

  render() {
    const { url } = this.props;

    return (
      <div className="ellipsis" title="Pitch webpage">
        <Icon name="world" />
        <a href={url}>
          {getDomain(url)}
        </a>
      </div>
    );
  }
}

export default BaseComponent(PitchWebpage);
