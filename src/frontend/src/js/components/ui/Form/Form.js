import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { renderConditionally } from 'utils';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import './Form.scss';

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    inputs: PropTypes.array.isRequired,
    onSubmit: PropTypes.func
  };

  render() {
    const {
      className,
      inputs,
      onSubmit
    } = this.props;

    const visibleInputs = inputs.reduce((inputsToRender, input) => {
      const haveAllInputsBeenValidSoFar = inputsToRender.every(({ isValid }) => isValid);
      if (haveAllInputsBeenValidSoFar) {
        inputsToRender.push(input);
      }
      return inputsToRender;
    }, []);
    const areAllInputsValid = visibleInputs.every(({ isValid }) => isValid);

    return (
      <div
        className={classNames(
          'form',
          className
        )}>
        <div className="inputs">
          {visibleInputs.map(({ label, value, isValid, component }, index) => (
            <InputWrapper
              key={index}
              label={label}
              value={value}
              isValid={isValid}>
              {component}
            </InputWrapper>
          ))}
        </div>

        {renderConditionally({
          when: Boolean(onSubmit),
          render: () => (
            <div className="submit-button-container">
              <Button
                className="submit-button"
                isDisabled={!areAllInputsValid}
                onClick={onSubmit}>
                <IconSave className="icon" />
                <span className="label">Save</span>
              </Button>
            </div>
          )
        })}
      </div>
    );
  }
}
