import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { List } from 'components/ui';
import GameEnrollmentListItem from './GameEnrollmentListItem';

class GameEnrollmentList extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollmentStatus: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const { className, enrollmentStatus, users } = this.props;

    return (
      <List
        className={classNames(
          'game-enrollment-list',
          className
        )}>
        {users.map((user, index) => (
          <GameEnrollmentListItem
            key={index}
            user={user}
            enrollmentStatus={enrollmentStatus} />
        ))}
      </List>
    );
  }
}

export default BaseComponent(GameEnrollmentList);
