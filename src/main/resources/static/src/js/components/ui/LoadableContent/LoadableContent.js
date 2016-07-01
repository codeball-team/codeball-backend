import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { renderConditionally } from 'utils';
import './LoadableContent.scss';

export default class LoadableContent extends Component {
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
