import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import './Button.scss';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: _.noop
  };

  render() {
    const {
      className,
      children,
      onClick
    } = this.props;

    return (
      <div
        onClick={() => onClick()}
        className={classNames(
          'button',
          className
        )}>
        {children}
      </div>
    );
  }
}
