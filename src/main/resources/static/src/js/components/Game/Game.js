import React, { Component, PropTypes } from 'react';
import { GameLineup, GameScore } from 'components';

export default class Game extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    pitch: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render () {
    const {
      className,
      currentUser,
      game,
      pitch,
      users
    } = this.props;

    const {
      date,
      time,
      teamA,
      teamAScore,
      teamB,
      teamBScore
    } = game;

    return (
      <div className={className}>
        <GameScore
          date={date}
          time={time}
          pitchName={pitch.name}
          teamAScore={teamAScore}
          teamBScore={teamBScore} />

        <GameLineup
          teamA={teamA}
          teamB={teamB}
          users={users} />
      </div>
    );
  }
}
