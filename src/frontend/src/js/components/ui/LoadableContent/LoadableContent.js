import React, { Component, PropTypes } from 'react';
import { _, classNames } from 'utils';
import { BaseComponent } from 'components/base';
import './LoadableContent.scss';

class LoadableContent extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isLoading: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.bool),
      PropTypes.bool
    ]).isRequired
  };

  render() {
    const { children, className, isLoading } = this.props;
    const loadingConditions = _([isLoading]).flatten();
    const shouldRender = !loadingConditions.some(Boolean);

    return (
      <div
        className={classNames(
          'loadable-content',
          {
            'is-loading': !shouldRender
          },
          className
        )}>
        {shouldRender && children}
      </div>
    );
  }
}

export default BaseComponent(LoadableContent);
