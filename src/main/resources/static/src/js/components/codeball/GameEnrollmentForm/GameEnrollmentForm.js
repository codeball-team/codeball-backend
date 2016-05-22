import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO
} from 'constants/Configuration';
import GameEnrollmentFormOption from './GameEnrollmentFormOption';
import './GameEnrollmentForm.scss';

const gameEnrollmentFormOptions = [
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
        {_(gameEnrollmentFormOptions).map(option => (
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
