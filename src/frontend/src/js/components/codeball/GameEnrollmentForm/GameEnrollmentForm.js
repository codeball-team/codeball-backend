import React, { Component, PropTypes } from 'react';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO
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
        {GAME_ENROLLMENT_FORM_OPTIONS.map(option => {
          const { value: optionValue } = option;
          return (
            <GameEnrollmentFormOption
              key={optionValue}
              inactive={value !== undefined && optionValue !== value}
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
