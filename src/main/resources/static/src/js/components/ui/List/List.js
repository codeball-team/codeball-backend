import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './List.scss';

export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
  };

  render() {
    const {
      className,
      children
    } = this.props;

    return (
      <div
        className={classNames(
          'list',
          className
        )}>
        {children}
      </div>
    );
  }
}
