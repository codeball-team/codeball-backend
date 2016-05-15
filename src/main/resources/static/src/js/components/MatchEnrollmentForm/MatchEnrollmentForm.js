import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO } from 'constants/Configuration';
import MatchEnrollmentFormOption from './MatchEnrollmentFormOption';
import './MatchEnrollmentForm.scss';

const matchEnrollmentFormOptions = [
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

export default class MatchEnrollmentForm extends Component {
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
          'match-enrollment-form',
          className
        )}>
        <div className="label">
          Are you going?
        </div>

        <div className="options">
          {_(matchEnrollmentFormOptions).map(option => (
            <MatchEnrollmentFormOption
              key={option.value}
              inactive={value !== undefined && option.value !== value}
              onClick={() => onChange(option.value)}
              {...option} />
          ))}
        </div>
      </div>
    );
  }
}
