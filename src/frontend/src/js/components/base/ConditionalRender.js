import React, { Component, PropTypes } from 'react';
import _ from 'underscore';

export default function ConditionalRender(ComponentClass) {
  return class EnhancedComponent extends Component {
    static propTypes = {
      renderWhen: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.bool),
        PropTypes.bool
      ])
    };

    static defaultProps = {
      renderWhen: true
    };

    render() {
      const { renderWhen, ...restProps } = this.props;
      const renderConditions = _([renderWhen]).flatten();
      const shouldRender = renderConditions.every(Boolean);

      if (!shouldRender) {
        return null;
      }

      return (
        <ComponentClass {...restProps} />
      );
    }
  };
}
