import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Button, EditableText, Icon } from 'components/ui';
import './NumberPicker.scss';

class NumberPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    value: PropTypes.number.isRequired,
    valueFormatter: PropTypes.func,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    orientation: 'horizontal',
    valueFormatter: String
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
      orientation,
      value,
      valueFormatter
    } = this.props;

    return (
      <div
        className={classNames(
          'number-picker',
          orientation,
          className
        )}>
        <Button className="subtract" onClick={this.onSubtract}>
          <Icon name="subtract" />
        </Button>

        <EditableText
          className="value"
          isDisabled={true}
          isEditing={true}
          text={valueFormatter(value)} />

        <Button className="add" onClick={this.onAdd}>
          <Icon name="add" />
        </Button>
      </div>
    );
  }
}

export default BaseComponent(NumberPicker);
