import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import TeamLineup from '../TeamLineup/TeamLineup';
import './GameLineup.scss';

class GameLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    teamA: PropTypes.array.isRequired,
    teamB: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      currentUser,
      teamA,
      teamB,
      users
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

export default BaseComponent(GameLineup);
