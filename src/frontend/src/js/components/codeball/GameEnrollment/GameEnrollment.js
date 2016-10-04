import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import {
  ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  ENROLLMENT_STATUS_STRING, ENROLLMENT_STATUS_YES
} from 'constants';
import { BaseComponent } from 'components/base';
import GameEnrollmentList from './GameEnrollmentList';
import './GameEnrollment.scss';

const ENROLLMENT_STATUS_CLASSNAMES = {
  [ENROLLMENT_STATUS_MAYBE]: 'bg-default-alert',
  [ENROLLMENT_STATUS_NO]: 'bg-danger',
  [ENROLLMENT_STATUS_YES]: 'bg-success'
};

class GameEnrollment extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrolledUsersPerStatus: PropTypes.array.isRequired
  };

  render() {
    const { className, enrolledUsersPerStatus } = this.props;

    return (
      <div
        className={classNames(
          'game-enrollment',
          className
        )}>
        {enrolledUsersPerStatus.map(({ enrollmentStatus, enrolledUsers }, index) => (
          <GameEnrollmentList
            key={index}
            renderWhen={enrolledUsers.length > 0}
            className={ENROLLMENT_STATUS_CLASSNAMES[enrollmentStatus]}
            enrollmentStatus={ENROLLMENT_STATUS_STRING[enrollmentStatus]}
            users={enrolledUsers} />
        ))}
      </div>
    );
  }
}

export default BaseComponent(GameEnrollment);
