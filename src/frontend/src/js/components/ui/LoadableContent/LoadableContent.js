import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import './LoadableContent.scss';

class LoadableContent extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    const {
      children,
      className,
      isLoading
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
        {!isLoading && children}
      </div>
    );
  }
}

export default BaseComponent(LoadableContent);
