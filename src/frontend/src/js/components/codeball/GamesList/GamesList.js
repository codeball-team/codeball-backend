import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { List } from 'components/ui';
import { GamesListItem } from 'components/codeball';
import './GamesList.scss';

class GamesList extends Component {
  static propTypes = {
    className: PropTypes.string,
    games: PropTypes.array.isRequired,
    urlFormatter: PropTypes.func.isRequired
  };

  render() {
    const { className, games, urlFormatter } = this.props;

    return (
      <List
        className={classNames(
          'games-list',
          className
        )}>
        {games.map((game, index) => (
          <GamesListItem
            key={index}
            game={game}
            urlFormatter={urlFormatter} />
        ))}
      </List>
    );
  }
}

export default BaseComponent(GamesList);
