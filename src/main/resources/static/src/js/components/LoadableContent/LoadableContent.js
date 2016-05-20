import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './LoadableContent.scss';

export default class LoadableContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    const {
      className,
      isLoading,
      children
    } = this.props;

    return (
      <div
        className={classNames(
          'loadable-content',
          {
            'is-loading': isLoading
          },
          className
        )}>
        {children}
      </div>
    );
  }
}
