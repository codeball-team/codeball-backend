import React, { Component, PropTypes } from 'react';
import {
  ENROLLMENT_STATUSES, ENROLLMENT_STATUS_MAYBE,
  ENROLLMENT_STATUS_NO, ENROLLMENT_STATUS_YES
} from 'constants';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
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

class GameEnrollmentForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollmentStatus: PropTypes.oneOf(ENROLLMENT_STATUSES),
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { className, enrollmentStatus, onChange } = this.props;

    return (
      <div
        className={classNames(
          'game-enrollment-form',
          className
        )}>
        {GAME_ENROLLMENT_FORM_OPTIONS.map((option, index) => {
          const { value: optionValue } = option;
          return (
            <GameEnrollmentFormOption
              key={index}
              inactive={enrollmentStatus !== undefined && optionValue !== enrollmentStatus}
              value={optionValue}
              onClick={onChange}
              {...option} />
          );
        })}
      </div>
    );
  }
}

export default BaseComponent(GameEnrollmentForm);
