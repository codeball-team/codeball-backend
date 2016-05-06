import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import MatchEnrollmentStatus from './MatchEnrollmentStatus';

export default class MatchEnrollmentStatuses extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollmentStatus: PropTypes.string.isRequired,
    enrolledUsers: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      enrollmentStatus,
      enrolledUsers
    } = this.props;

    return (
      <div
        className={classNames(
          'match-enrollment-entries',
          className
        )}>
        {_(enrolledUsers).map(user => {
          const {
            id,
            name
          } = user;

          return (
            <MatchEnrollmentStatus
              key={id}
              name={name}
              enrollmentStatus={enrollmentStatus} />
          );
        })}
      </div>
    );
  }
}
