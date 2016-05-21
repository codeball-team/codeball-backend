import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { List, Section } from 'components/ui';
import PlayersListItem from '../PlayersListItem/PlayersListItem';

export default class PlayersList extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    users: PropTypes.any.isRequired
  };

  render() {
    const {
      className,
      title,
      currentUser,
      users
    } = this.props;

    return (
      <Section
        title={title}
        className={className}>
        <List className="players-list">
          {_(users).map(user => {
            const { id } = user;

            return (
              <PlayersListItem key={id} user={user} />
            );
          })}
        </List>
      </Section>
    );
  }
}
