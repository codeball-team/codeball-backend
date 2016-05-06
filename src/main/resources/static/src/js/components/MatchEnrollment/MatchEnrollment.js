import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import './MatchEnrollment.scss';

export default class MatchEnrollment extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    enrolledUsers: PropTypes.object.isRequired
  };

  render() {
    const {
      users,
      enrolledUsers
    } = this.props;

    return (
      <div className="match-enrollment">
        {_(enrolledUsers).map((enrollmentStatus, userId) => {
          const {
            name
          } = users[userId];

          return (
            <div key={userId}>
              {name} - {enrollmentStatus}
            </div>
          );
        })}
      </div>
    );
  }
}
