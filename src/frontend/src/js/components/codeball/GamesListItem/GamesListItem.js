import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Link, ListItem } from 'components/ui';
import './GamesListItem.scss';

class GamesListItem extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    urlFormatter: PropTypes.func.isRequired
  };

  render() {
    const {
      game: {
        id,
        date,
        pitch: {
          name: pitchName
        },
        teamAScore,
        teamBScore,
        time
      },
      urlFormatter
    } = this.props;

    return (
      <Link to={urlFormatter(id)}>
        <ListItem className="games-list-item">
          <div className="date-time ellipsis">
            {date} {time}
          </div>

          <div className="pitch ellipsis">
            {pitchName}
          </div>

          <div className="score">
            {teamAScore} : {teamBScore}
          </div>
        </ListItem>
      </Link>
    );
  }
}

export default BaseComponent(GamesListItem);
