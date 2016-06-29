import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import './Button.scss';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    isDisabled: false,
    onClick: _.noop
  };

  render() {
    const {
      className,
      children,
      isDisabled,
      onClick
    } = this.props;

    return (
      <div
        onClick={() => onClick()}
        className={classNames(
          'button',
          'ellipsis',
          {
            'is-disabled': isDisabled
          },
          className
        )}>
        {children}
      </div>
    );
  }
}
