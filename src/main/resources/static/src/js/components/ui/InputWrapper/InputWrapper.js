import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import './InputWrapper.scss';

export default class InputWrapper extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    isValid: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
  };

  render() {
    const {
      className,
      children,
      isValid,
      label
    } = this.props;

    return (
      <div
        className={classNames(
          'input-wrapper',
          className
        )}>
        <div className="label">
          {label}
        </div>
        <div className="content">
          <div className="field">
            {children}
          </div>
          <div
            className={classNames(
              'validation',
              {
                'valid': isValid,
                'invalid': !isValid
              }
            )}>
            {isValid && (
              <IconSave className="icon" />
            )}
            {!isValid && (
              <IconCancel className="icon" />
            )}
          </div>
        </div>
      </div>
    );
  }
}
