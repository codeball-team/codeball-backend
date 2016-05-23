import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './EditableText.scss';

export default class EditableText extends Component {
  static propTypes = {
    className: PropTypes.string,
    isEditing: PropTypes.bool,
    inputType: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    isEditing: false,
    inputType: 'text',
    text: ''
  };

  onChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const {
      className,
      isEditing,
      inputType,
      text
    } = this.props;

    if (isEditing) {
      return (
        <input
          value={text}
          type={inputType}
          onChange={this.onChange}
          className={classNames(
            'editable-text-input',
            className
          )} />
      );
    }

    return (
      <span
        className={classNames(
          'editable-text',
          className
        )}>
        {text}
      </span>
    );
  }
}
