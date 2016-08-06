import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ConditionalRender } from 'components/base';
import { List } from 'components/ui';
import PlayersListItem from '../PlayersListItem/PlayersListItem';

class PlayersList extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      users
    } = this.props;

    return (
      <List
        className={classNames(
          'players-list',
          className
        )}>
        {users.map(user => {
          const { id } = user;

          return (
            <PlayersListItem key={id} user={user} />
          );
        })}
      </List>
    );
  }
}

export default ConditionalRender(PlayersList);
