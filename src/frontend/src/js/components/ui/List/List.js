import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import './List.scss';

class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const { children, className } = this.props;

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

export default BaseComponent(List);
