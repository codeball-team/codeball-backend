import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './ButtonsPanel.scss';

export default class ButtonsPanel extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  render() {
    const {
      className,
      children
    } = this.props;

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
