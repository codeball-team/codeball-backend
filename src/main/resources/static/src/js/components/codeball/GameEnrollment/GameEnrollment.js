import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO,
  ENROLLMENT_STATUS_STRING
} from 'constants/Configuration';
import GameEnrollmentListItems from './GameEnrollmentListItems';
import './GameEnrollment.scss';

const enrollmentStatusClassnames = {
  [ENROLLMENT_STATUS_YES]: 'bg-success',
  [ENROLLMENT_STATUS_MAYBE]: 'bg-default-alert',
  [ENROLLMENT_STATUS_NO]: 'bg-danger'
};

const enrollmentStatuses = _(ENROLLMENT_STATUS_STRING).keys();

export default class GameEnrollment extends Component {
  static propTypes = {
    className: PropTypes.string,
    users: PropTypes.object.isRequired,
    enrolledUsers: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      users,
      enrolledUsers
    } = this.props;

    return (
      <div
        className={classNames(
          'game-enrollment',
          className
        )}>
        {_(enrollmentStatuses).map(enrollmentStatus => {
          const enrollmentStatusUsers = _(
            _(enrolledUsers[enrollmentStatus]).map(userId => users[userId])
          ).compact();

          return (enrollmentStatusUsers.length === 0)
            ? null
            : (
              <GameEnrollmentListItems
                key={enrollmentStatus}
                className={enrollmentStatusClassnames[enrollmentStatus]}
                enrollmentStatus={ENROLLMENT_STATUS_STRING[enrollmentStatus]}
                enrolledUsers={enrollmentStatusUsers} />
            );
        })}
      </div>
    );
  }
}
