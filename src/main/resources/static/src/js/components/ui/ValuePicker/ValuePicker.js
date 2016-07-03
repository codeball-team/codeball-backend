import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ValuePickerOption from './ValuePickerOption';
import './ValuePicker.scss';

export default class ValuePicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    optionClassName: PropTypes.string,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired
  };

  onChange = value => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      className,
      optionClassName,
      options,
      value: currentValue
    } = this.props;

    return (
      <div
        className={classNames(
          'value-picker',
          className
        )}>
        {options.map(({ label, value }, index) => (
          <ValuePickerOption
            key={index}
            className={classNames(
              optionClassName,
              {
                'is-selected': value === currentValue
              }
            )}
            label={label}
            value={value}
            onClick={this.onChange} />
        ))}
      </div>
    );
  }
}
