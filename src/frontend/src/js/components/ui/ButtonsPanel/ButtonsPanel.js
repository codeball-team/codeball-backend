import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import './ButtonsPanel.scss';

class ButtonsPanel extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const { children, className } = this.props;

    return (
      <div
        className={classNames(
          'buttons-panel',
          className
        )}>
        {children}
      </div>
    );
  }
}

export default BaseComponent(ButtonsPanel);
