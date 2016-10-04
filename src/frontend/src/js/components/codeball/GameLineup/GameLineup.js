import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { TeamLineup } from 'components/codeball';
import './GameLineup.scss';

class GameLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    teamA: PropTypes.array.isRequired,
    teamB: PropTypes.array.isRequired
  };

  render() {
    const { className, teamA, teamB } = this.props;

    return (
      <div
        className={classNames(
          'game-lineup',
          className
        )}>
        <TeamLineup
          teamName="Team A"
          users={teamA} />

        <TeamLineup
          teamName="Team B"
          users={teamB} />
      </div>
    );
  }
}

export default BaseComponent(GameLineup);
