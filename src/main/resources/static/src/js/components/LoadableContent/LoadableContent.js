import React, { Component, PropTypes } from 'react';
import Spinner from '../Spinner/Spinner';

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
      <div className={className}>
        {isLoading && (
          <Spinner
            placement="relative"
            show={true} />
        )}

        {!isLoading && (
          children
        )}
      </div>
    );
  }
}
