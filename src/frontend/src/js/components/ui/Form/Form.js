import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import InputWrapper from '../InputWrapper/InputWrapper';

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    inputs: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      inputs
    } = this.props;

    const visibleInputs = inputs.reduce((inputsToRender, input) => {
      const haveAllInputsBeenValidSoFar = inputsToRender.every(({ isValid }) => isValid);
      if (haveAllInputsBeenValidSoFar) {
        inputsToRender.push(input);
      }
      return inputsToRender;
    }, []);

    return (
      <div
        className={classNames(
          'form',
          className
        )}>
        {visibleInputs.map(({ label, value, isValid, render }, index) => (
          <InputWrapper
            key={index}
            label={label}
            value={value}
            isValid={isValid}>
            {render()}
          </InputWrapper>
        ))}
      </div>
    );
  }
}
