import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './EditableText.scss';

export default class EditableText extends Component {
  static propTypes = {
    className: PropTypes.string,
    isEditing: PropTypes.bool,
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
      text,
      ...childProps
    } = this.props;

    if (isEditing) {
      return (
        <input
          {...childProps}
          value={text}
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
