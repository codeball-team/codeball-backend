import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import GameEnrollmentEntry from './GameEnrollmentEntry';

export default class GameEnrollmentEntries extends Component {
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
          'game-enrollment-entries',
          className
        )}>
        {_(enrolledUsers).map(user => {
          const {
            id,
            firstName,
            lastName
          } = user;

          return (
            <GameEnrollmentEntry
              key={id}
              firstName={firstName}
              lastName={lastName}
              enrollmentStatus={enrollmentStatus} />
          );
        })}
      </div>
    );
  }
}
