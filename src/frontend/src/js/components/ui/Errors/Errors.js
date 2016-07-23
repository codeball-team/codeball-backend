import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Error from './Error';
import './Errors.scss';

export default class Errors extends Component {
  static propTypes = {
    className: PropTypes.string,
    errors: PropTypes.array.isRequired,
    onErrorAcknowledge: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      errors,
      onErrorAcknowledge
    } = this.props;

    return (
      <div
        className={classNames(
          'errors',
          className
        )}>
        {errors.map((error, errorIndex) => (
          <Error
            key={errorIndex}
            error={error}
            errorIndex={errorIndex}
            onErrorAcknowledge={onErrorAcknowledge} />
        ))}
      </div>
    );
  }
}
