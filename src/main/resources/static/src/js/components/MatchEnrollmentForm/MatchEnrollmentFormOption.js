import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class MatchEnrollmentFormOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      inactive,
      text,
      onClick
    } = this.props;

    return (
      <div
        className={classNames(
          'option',
          className,
          {
            inactive
          }
        )}
        onClick={() => onClick()}>
        {text}
      </div>
    );
  }
}
