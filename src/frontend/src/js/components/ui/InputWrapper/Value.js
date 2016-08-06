import React, { Component, PropTypes } from 'react';
import { ConditionalRender } from 'components/base';

class Value extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  };
  render() {
    const { value } = this.props;

    return (
      <span>
        <span>:</span>
        <span className="text-highlight">{` ${value}`}</span>
      </span>
    );
  }
}

export default ConditionalRender(Value);
