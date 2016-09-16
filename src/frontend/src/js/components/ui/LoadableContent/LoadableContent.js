import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import './LoadableContent.scss';

class LoadableContent extends Component {
  static propTypes = {
    childProps: PropTypes.object,
    ComponentClass: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    childProps: {}
  };

  render() {
    const { ComponentClass, childProps, isLoading } = this.props;

    return (
      <div
        className={classNames(
          'loadable-content',
          {
            'is-loading': isLoading
          }
        )}>
        {!isLoading && (
          <ComponentClass {...childProps} />
        )}
      </div>
    );
  }
}

export default BaseComponent(LoadableContent);
