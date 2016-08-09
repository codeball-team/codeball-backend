import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';

class ValuePickerOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { value, onClick } = this.props;
    onClick(value);
  }

  render() {
    const { className, label } = this.props;

    return (
      <div
        onClick={this.onClick}
        className={classNames(
          'value-picker-option',
          className
        )}>
        {label}
      </div>
    );
  }
}

export default BaseComponent(ValuePickerOption);
