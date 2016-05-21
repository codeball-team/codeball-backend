import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Section } from 'components';
import TeamLineup from '../TeamLineup/TeamLineup';
import './GameLineup.scss';

export default class GameLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    users: PropTypes.object.isRequired,
    teamA: PropTypes.array.isRequired,
    teamB: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      users,
      teamA,
      teamB
    } = this.props;

    return (
      <Section
        title="Lineups"
        className={classNames(
          'game-lineup',
          className
        )}>
        <div className="lineups">
          <TeamLineup
            teamName="Team A"
            users={users}
            team={teamA} />

          <TeamLineup
            teamName="Team B"
            users={users}
            team={teamB} />
        </div>
      </Section>
    );
  }
}
