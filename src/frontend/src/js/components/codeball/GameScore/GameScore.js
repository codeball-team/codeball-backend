import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { EditableText, Link } from 'components/ui';
import './GameScore.scss';

class GameScore extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired,
    isEditing: PropTypes.bool,
    pitch: PropTypes.object.isRequired,
    onEditGameScoreA: PropTypes.func,
    onEditGameScoreB: PropTypes.func
  };

  onGameScoreAChanged = teamAScore => {
    const { onEditGameScoreA } = this.props;
    onEditGameScoreA(teamAScore);
  };

  onGameScoreBChanged = teamBScore => {
    const { onEditGameScoreB } = this.props;
    onEditGameScoreB(teamBScore);
  };

  render() {
    const {
      className,
      game: {
        date,
        time,
        teamAScore,
        teamBScore
      },
      isEditing,
      pitch: {
        id: pitchId,
        name: pitchName
      }
    } = this.props;

    return (
      <div
        className={classNames(
          'game-score',
          className
        )}>
        <div className="score">
          <EditableText
            className="team-score score-a"
            isEditing={isEditing}
            text={teamAScore}
            maxLength="2"
            onChange={this.onGameScoreAChanged} />

          <span> : </span>

          <EditableText
            className="team-score score-b"
            isEditing={isEditing}
            text={teamBScore}
            maxLength="2"
            onChange={this.onGameScoreBChanged} />
        </div>

        <div className="details" title="Pitch">
          <Link to={`/pitches/${pitchId}`}>
            {pitchName}
          </Link>
        </div>

        <div className="details" title="Game date">
          {date}
        </div>

        <div className="details" title="Game time">
          {time}
        </div>
      </div>
    );
  }
}

export default BaseComponent(GameScore);
