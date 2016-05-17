import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO } from 'constants/Configuration';
import GameEnrollmentEntries from './GameEnrollmentEntries';
import './GameEnrollment.scss';

const enrollmentStatusClassnames = {
  [ENROLLMENT_STATUS_YES]: 'yes',
  [ENROLLMENT_STATUS_MAYBE]: 'maybe',
  [ENROLLMENT_STATUS_NO]: 'no'
};

const enrollmentStatusText = {
  [ENROLLMENT_STATUS_YES]: 'Going',
  [ENROLLMENT_STATUS_MAYBE]: 'Unsure',
  [ENROLLMENT_STATUS_NO]: 'Not going'
};

const enrollmentStatuses = _(enrollmentStatusText).keys();

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
        <div className="title">
          Enrolled players ({enrolledUsers[ENROLLMENT_STATUS_YES].length})
        </div>

        <div>
          {_(enrollmentStatuses).map(enrollmentStatus => (
            <GameEnrollmentEntries
              key={enrollmentStatus}
              className={enrollmentStatusClassnames[enrollmentStatus]}
              enrollmentStatus={enrollmentStatusText[enrollmentStatus]}
              enrolledUsers={
                _(
                  _(enrolledUsers[enrollmentStatus]).map(userId => users[userId])
                ).compact()
              } />
          ))}
        </div>
      </div>
    );
  }
}
