import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  ENROLLMENT_STATUS_STRING
} from 'constants';
import { BaseComponent } from 'components/base';
import GameEnrollmentList from './GameEnrollmentList';
import './GameEnrollment.scss';

const ENROLLMENT_STATUS_CLASSNAMES = {
  [ENROLLMENT_STATUS_YES]: 'bg-success',
  [ENROLLMENT_STATUS_MAYBE]: 'bg-default-alert',
  [ENROLLMENT_STATUS_NO]: 'bg-danger'
};

class GameEnrollment extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollments: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      enrollments
    } = this.props;

    return (
      <div
        className={classNames(
          'game-enrollment',
          className
        )}>
        {enrollments.map(({ enrollmentStatus, enrollmentUsers }) => (
          <GameEnrollmentList
            key={enrollmentStatus}
            renderWhen={enrollmentUsers.length > 0}
            className={ENROLLMENT_STATUS_CLASSNAMES[enrollmentStatus]}
            enrollmentStatus={ENROLLMENT_STATUS_STRING[enrollmentStatus]}
            users={enrollmentUsers} />
        ))}
      </div>
    );
  }
}

export default BaseComponent(GameEnrollment);
