import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO
} from 'constants';
import GameEnrollmentFormOption from './GameEnrollmentFormOption';
import './GameEnrollmentForm.scss';

const GAME_ENROLLMENT_FORM_OPTIONS = [
  {
    className: 'yes',
    value: ENROLLMENT_STATUS_YES,
    text: 'Yes'
  },
  {
    className: 'maybe',
    value: ENROLLMENT_STATUS_MAYBE,
    text: 'Maybe'
  },
  {
    className: 'no',
    value: ENROLLMENT_STATUS_NO,
    text: 'No'
  }
];

export default class GameEnrollmentForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOf([
      ENROLLMENT_STATUS_YES,
      ENROLLMENT_STATUS_MAYBE,
      ENROLLMENT_STATUS_NO
    ]),
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {
      className,
      value,
      onChange
    } = this.props;

    return (
      <div
        className={classNames(
          'game-enrollment-form',
          className
        )}>
        {GAME_ENROLLMENT_FORM_OPTIONS.map(option => (
          <GameEnrollmentFormOption
            key={option.value}
            inactive={value !== undefined && option.value !== value}
            onClick={() => onChange(option.value)}
            {...option} />
        ))}
      </div>
    );
  }
}
