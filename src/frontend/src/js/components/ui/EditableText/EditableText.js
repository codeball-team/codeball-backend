import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import './EditableText.scss';

export default class EditableText extends Component {
  static propTypes = {
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isEditing: PropTypes.bool,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    isDisabled: false,
    isEditing: false,
    inputType: 'text',
    text: '',
    onChange: _.noop
  };

  onChange = event => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const {
      className,
      isDisabled,
      isEditing,
      text,
      ...childProps
    } = this.props;

    if (isEditing) {
      return (
        <input
          {...childProps}
          value={String(text === undefined ? '' : text)}
          onChange={this.onChange}
          disabled={isDisabled}
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
