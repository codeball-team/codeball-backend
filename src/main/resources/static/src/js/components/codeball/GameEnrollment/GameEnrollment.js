import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import {
  ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO
} from 'constants/Configuration';
import { Section } from 'components/ui';
import GameEnrollmentListItems from './GameEnrollmentListItems';
import './GameEnrollment.scss';

const enrollmentStatusClassnames = {
  [ENROLLMENT_STATUS_YES]: 'bg-success',
  [ENROLLMENT_STATUS_MAYBE]: 'bg-default-alert',
  [ENROLLMENT_STATUS_NO]: 'bg-danger'
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
      <Section
        title={`Enrolled players (${enrolledUsers[ENROLLMENT_STATUS_YES].length})`}
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
                enrollmentStatus={enrollmentStatusText[enrollmentStatus]}
                enrolledUsers={enrollmentStatusUsers} />
            );
        })}
      </Section>
    );
  }
}
