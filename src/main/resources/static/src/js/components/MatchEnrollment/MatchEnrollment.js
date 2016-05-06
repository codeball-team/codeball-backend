import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import EnrollmentStatuses from './EnrollmentStatuses';
import './MatchEnrollment.scss';

const enrollmentStatusClassnames = {
  yes: 'yes',
  maybe: 'maybe',
  no: 'no'
};

const enrollmentStatusText = {
  yes: 'Going',
  maybe: 'Unsure',
  no: 'Not going'
};

const enrollmentStatuses = _(enrollmentStatusText).keys();

export default class MatchEnrollment extends Component {
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
          'match-enrollment',
          className
        )}>
        <div className="title">
          Enrolled players ({enrolledUsers.yes.length})
        </div>

        {_(enrollmentStatuses).map(enrollmentStatus => (
          <EnrollmentStatuses
            key={enrollmentStatus}
            className={enrollmentStatus}
            enrollmentStatus={enrollmentStatusText[enrollmentStatus]}
            enrolledUsers={_(enrolledUsers[enrollmentStatus]).map(userId => users[userId])} />
        ))}
      </div>
    );
  }
}
