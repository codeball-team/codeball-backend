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

  constructor(props) {
    super(props);
    this.state = {
      hasBeenFullyLoaded: false
    };
  }

  componentWillReceiveProps = newProps => {
    const { hasBeenFullyLoaded } = this.state;
    if(!hasBeenFullyLoaded) {
      const { isLoading: wasLoading } = this.props;
      const { isLoading } = newProps;
      const hasFinishedLoading = wasLoading && !isLoading;
      this.setState({ hasBeenFullyLoaded: hasFinishedLoading });
    }
  };

  render() {
    const { childProps, ComponentClass, isLoading } = this.props;
    const { hasBeenFullyLoaded } = this.state;
    const displayLoadingState = !hasBeenFullyLoaded && isLoading;

    return (
      <div
        className={classNames(
          'loadable-content',
          {
            'is-loading': displayLoadingState
          }
        )}>
        {!displayLoadingState && (
          <ComponentClass {...childProps} />
        )}
      </div>
    );
  }
}

export default BaseComponent(LoadableContent);
