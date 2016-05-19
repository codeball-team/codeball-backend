import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { Link } from 'react-router';
import './GamesList.scss';

export default class GamesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    pitches: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      currentUser,
      games,
      pitches,
      users
    } = this.props;

    return (
      <div>
        {games.map((game) => {
          const {
            id,
            date,
            time,
            pitchId,
            teamA,
            teamAScore,
            teamB,
            teamBScore
          } = game;
          const pitch = pitches[pitchId];

          return (
            <div
              key={id}>
              <Link to={`games/${id}`}>
                {date} {time}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
