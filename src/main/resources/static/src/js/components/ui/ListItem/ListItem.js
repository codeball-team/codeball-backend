import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './ListItem.scss';

export default class ListItem extends Component {
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
          'list-item',
          className
        )}>
        {children}
      </div>
    );
  }
}
