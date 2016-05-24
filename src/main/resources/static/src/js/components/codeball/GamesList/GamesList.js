import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { Link } from 'react-router';
import { List, ListItem } from 'components/ui';
import './GamesList.scss';

export default class GamesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    isEditing: PropTypes.bool,
    formatUrl: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    pitches: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      isEditing,
      formatUrl,
      games,
      pitches
    } = this.props;

    return (
      <List
        className={classNames(
          'games-list',
          className
        )}>
        {_(games).map((game) => {
          const {
            id,
            date,
            time,
            pitchId,
            teamAScore,
            teamBScore
          } = game;
          const pitch = pitches[pitchId];

          return (
            <Link key={id} to={formatUrl(id)}>
              <ListItem className="games-list-item">
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

        {isEditing && (
          <Link to="games/add">
            <ListItem className="">
              Add new game
            </ListItem>
          </Link>
        )}
      </List>
    );
  }
}
