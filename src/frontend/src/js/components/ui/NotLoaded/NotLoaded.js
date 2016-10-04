import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import './NotLoaded.scss';

class NotLoaded extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    message: PropTypes.string.isRequired
  };

  render() {
    const { children, className, message } = this.props;

    return (
      <div
        className={classNames(
          'not-loaded',
          className
        )}>
        <div className="message">
          {message}
        </div>

        {children}
      </div>
    );
  }
}

export default BaseComponent(NotLoaded);
