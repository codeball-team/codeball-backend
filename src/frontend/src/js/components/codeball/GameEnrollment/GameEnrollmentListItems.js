import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ConditionalRender } from 'components/base';
import { List } from 'components/ui';
import GameEnrollmentListItem from './GameEnrollmentListItem';

class GameEnrollmentListItems extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrolledUsers: PropTypes.array.isRequired,
    enrollmentStatus: PropTypes.string.isRequired
  };

  render() {
    const {
      className,
      enrolledUsers,
      enrollmentStatus
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

export default ConditionalRender(GameEnrollmentListItems);
