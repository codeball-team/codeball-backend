import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TeamLineup from '../TeamLineup/TeamLineup';
import './GameLineup.scss';

export default class GameLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    teamA: PropTypes.array.isRequired,
    teamB: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      currentUser,
      users,
      teamA,
      teamB
    } = this.props;

    return (
      <div
        className={classNames(
          'game-lineup',
          className
        )}>
        <TeamLineup
          teamName="Team A"
          currentUser={currentUser}
          users={users}
          team={teamA} />

        <TeamLineup
          teamName="Team B"
          currentUser={currentUser}
          users={users}
          team={teamB} />
      </div>
    );
  }
}
