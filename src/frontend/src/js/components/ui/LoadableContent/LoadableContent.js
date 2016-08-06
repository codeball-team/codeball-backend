import React, { Component, PropTypes } from 'react';
import { classNames, renderConditionally } from 'utils';
import { BaseComponent } from 'components/base';
import './LoadableContent.scss';

class LoadableContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      isLoading,
      render
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
        {renderConditionally({
          when: !isLoading,
          render
        })}
      </div>
    );
  }
}

export default BaseComponent(LoadableContent);
