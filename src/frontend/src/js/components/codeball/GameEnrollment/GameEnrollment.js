import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { findById, renderConditionally } from 'utils';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  ENROLLMENT_STATUS_STRING
} from 'constants';
import GameEnrollmentListItems from './GameEnrollmentListItems';
import './GameEnrollment.scss';

const ENROLLMENT_STATUS_CLASSNAMES = {
  [ENROLLMENT_STATUS_YES]: 'bg-success',
  [ENROLLMENT_STATUS_MAYBE]: 'bg-default-alert',
  [ENROLLMENT_STATUS_NO]: 'bg-danger'
};

const ENROLLMENT_STATUSES = Object.keys(ENROLLMENT_STATUS_STRING);

export default class GameEnrollment extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrolledUsers: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      enrolledUsers,
      users
    } = this.props;

    return (
      <div
        className={classNames(
          'game-enrollment',
          className
        )}>
        {ENROLLMENT_STATUSES.map(enrollmentStatus => {
          const enrollmentStatusUsers = enrolledUsers[enrollmentStatus]
            .map(userId => findById(users, userId, null))
            .filter(Boolean);

          return renderConditionally({
            when: enrollmentStatusUsers.length > 0,
            render: () => (
              <GameEnrollmentListItems
                key={enrollmentStatus}
                className={ENROLLMENT_STATUS_CLASSNAMES[enrollmentStatus]}
                enrollmentStatus={ENROLLMENT_STATUS_STRING[enrollmentStatus]}
                enrolledUsers={enrollmentStatusUsers} />
            )
          });
        })}
      </div>
    );
  }
}