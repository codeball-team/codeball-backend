import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './ButtonsPanel.scss';

export default class ButtonsPanel extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const {
      children,
      className
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
