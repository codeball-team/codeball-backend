import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconAdd from 'react-icons/lib/io/plus';
import IconSubtract from 'react-icons/lib/io/minus';
import Button from '../Button/Button';
import EditableText from '../EditableText/EditableText';
import './NumberPicker.scss';

export default class NumberPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    formatter: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    value: PropTypes.number.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    formatter: String,
    orientation: 'horizontal'
  };

  onAdd = () => {
    this.onChange(1);
  };

  onSubtract = () => {
    this.onChange(-1);
  };

  onChange = step => {
    const { value, values, onChange } = this.props;
    const numberOfValues = values.length;
    const indexOfValue = values.indexOf(value);
    const indexOfNewValue = (indexOfValue + step + numberOfValues) % numberOfValues;
    const newValue = values[indexOfNewValue];
    onChange(newValue);
  };

  render() {
    const {
      className,
      formatter,
      orientation,
      value
    } = this.props;

    return (
      <div
        className={classNames(
          'number-picker',
          {
            vertical: orientation === 'vertical'
          },
          className
        )}>
        <Button className="subtract" onClick={this.onSubtract}>
          <IconSubtract className="icon" />
        </Button>

        <EditableText
          className="value"
          isDisabled={true}
          isEditing={true}
          text={formatter(value)} />

        <Button className="add" onClick={this.onAdd}>
          <IconAdd className="icon" />
        </Button>
      </div>
    );
  }
}
