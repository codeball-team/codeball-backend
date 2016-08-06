import React, { Component, PropTypes } from 'react';
import { classNames, findById, sortByMany } from 'utils';
import { BaseComponent } from 'components/base';
import { PlayersList } from 'components/codeball';
import './TeamLineup.scss';

class TeamLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired,
    teamName: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      currentUser,
      team,
      teamName,
      users
    } = this.props;

    const teamUsers = team.map(userId => findById(users, userId, null)).filter(Boolean);
    const sortedTeamUsers = sortByMany(teamUsers, ['lastName', 'firstName']);

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

        <PlayersList
          users={sortedTeamUsers}
          currentUser={currentUser} />
      </div>
    );
  }
}

export default BaseComponent(TeamLineup);
