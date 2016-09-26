import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { List } from 'components/ui';
import { GamesListItem } from 'components/codeball';
import './GamesList.scss';

class GamesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    formatUrl: PropTypes.func.isRequired,
    games: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      formatUrl,
      games
    } = this.props;

    return (
      <List
        className={classNames(
          'games-list',
          className
        )}>
        {games.map(game => {
          const { id } = game;

          return (
            <GamesListItem
              key={id}
              formatUrl={formatUrl}
              game={game} />
          );
        })}
      </List>
    );
  }
}

export default BaseComponent(GamesList);
