import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { Link } from 'react-router';
import { List, ListItem, Section } from 'components';
import './GamesList.scss';

export default class GamesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    formatUrl: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    pitches: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      title,
      formatUrl,
      currentUser,
      games,
      pitches,
      users
    } = this.props;

    return (
      <Section
        title={title}
        className={classNames(
          'games-list',
          className
        )}>
        <List className="game-entries">
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
              <Link key={id} to={formatUrl(id)}>
                <ListItem className="game-entry">
                  <div className="date-time ellipsis">
                    {date} {time}
                  </div>

                  <div className="pitch ellipsis">
                    {pitch.name}
                  </div>

                  <div className="score">
                    {teamAScore} : {teamBScore}
                  </div>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Section>
    );
  }
}
