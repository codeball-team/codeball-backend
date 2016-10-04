import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { List } from 'components/ui';
import { UsersListItem } from 'components/codeball';

class UsersList extends Component {
  static propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired
  };

  render() {
    const { className, users } = this.props;

    return (
      <List
        className={classNames(
          'users-list',
          className
        )}>
        {users.map((user, index) => (
          <UsersListItem key={index} user={user} />
        ))}
      </List>
    );
  }
}

export default BaseComponent(UsersList);
