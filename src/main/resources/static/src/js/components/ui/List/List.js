import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './List.scss';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
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
          'list',
          className
        )}>
        {children}
      </div>
    );
  }
}
