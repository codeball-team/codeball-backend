import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ConditionalRender } from 'components/base';
import Error from './Error';
import './Errors.scss';

class Errors extends Component {
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

export default ConditionalRender(Errors);
