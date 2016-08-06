import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import NumberPicker from '../NumberPicker/NumberPicker';
import './RangePicker.scss';

class RangePicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    formatter: PropTypes.func,
    max: PropTypes.number,
    maxOptions: PropTypes.array,
    min: PropTypes.number,
    minOptions: PropTypes.array,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    separator: PropTypes.string,
    onMaxChange: PropTypes.func.isRequired,
    onMinChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    orientation: 'vertical',
    separator: '-'
  };

  render() {
    const {
      className,
      formatter,
      max,
      maxOptions,
      min,
      minOptions,
      orientation,
      separator,
      onMaxChange,
      onMinChange
    } = this.props;

    return (
      <div
        className={classNames(
          'range-picker',
          className
        )}>
        <NumberPicker
          className="min-picker"
          orientation={orientation}
          values={minOptions}
          value={min}
          formatter={formatter}
          onChange={onMinChange} />

        <span className="separator"> {separator} </span>

        <NumberPicker
          className="max-picker"
          orientation={orientation}
          values={maxOptions}
          value={max}
          formatter={formatter}
          onChange={onMaxChange} />
      </div>
    );
  }
}

export default BaseComponent(RangePicker);
