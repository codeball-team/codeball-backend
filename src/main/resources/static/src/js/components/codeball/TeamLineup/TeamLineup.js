import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import { List, ListItem } from 'components/ui';
import './TeamLineup.scss';

export default class TeamLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    teamName: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      teamName,
      users,
      team
    } = this.props;

    const teamUsers = _(
      _(team).map(userId => users[userId])
    ).compact();
    const sortedTeamUsers = _(
      _(teamUsers).sortBy('firstName')
    ).sortBy('lastName');

    return (
      <div
        className={classNames(
          'team-lineup',
          'ellipsis',
          className
        )}>
        <div className="team-name ellipsis">
          {teamName}
        </div>

        <List>
          {_(sortedTeamUsers).map((user, index) => {
            const {
              id,
              firstName,
              lastName
            } = user;

            return (
              <ListItem
                key={id}
                className="ellipsis">
                {firstName} {lastName}
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
