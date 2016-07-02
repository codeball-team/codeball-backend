import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { List } from 'components/ui';
import GameEnrollmentListItem from './GameEnrollmentListItem';

export default class GameEnrollmentListItems extends Component {
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
      <List
        className={classNames(
          'game-enrollment-list',
          className
        )}>
        {enrolledUsers.map(user => {
          const { id } = user;

          return (
            <GameEnrollmentListItem
              key={id}
              user={user}
              enrollmentStatus={enrollmentStatus} />
          );
        })}
      </List>
    );
  }
}
