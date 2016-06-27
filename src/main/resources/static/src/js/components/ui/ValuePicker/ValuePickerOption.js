import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ValuePickerOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
