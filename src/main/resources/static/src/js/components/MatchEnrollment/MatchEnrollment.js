import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import MatchEnrollmentStatuses from './MatchEnrollmentStatuses';
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

        <div>
          {_(enrollmentStatuses).map(enrollmentStatus => (
            <MatchEnrollmentStatuses
              key={enrollmentStatus}
              className={enrollmentStatus}
              enrollmentStatus={enrollmentStatusText[enrollmentStatus]}
              enrolledUsers={_(enrolledUsers[enrollmentStatus]).map(userId => users[userId])} />
          ))}
        </div>

        <div className="match-enrollment-form">
          <div className="label">
            Are you going?
          </div>

          <div className="options">
            <div className="option yes">
              Yes
            </div>
            <div className="option maybe">
              Maybe
            </div>
            <div className="option no">
              No
            </div>
          </div>
        </div>
      </div>
    );
  }
}
