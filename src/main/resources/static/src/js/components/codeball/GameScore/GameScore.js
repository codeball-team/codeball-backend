import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { EditableText } from 'components/ui';
import './GameScore.scss';

export default class GameScore extends Component {
  static propTypes = {
    className: PropTypes.string,
    isEditing: PropTypes.bool,
    game: PropTypes.object.isRequired,
    pitch: PropTypes.object.isRequired,
    onEditGameScoreA: PropTypes.func,
    onEditGameScoreB: PropTypes.func
  };

  onGameScoreAChanged = (teamAScore) => {
    const { onEditGameScoreA } = this.props;
    onEditGameScoreA(teamAScore);
  };

  onGameScoreBChanged = (teamBScore) => {
    const { onEditGameScoreB } = this.props;
    onEditGameScoreB(teamBScore);
  };

  render() {
    const {
      className,
      isEditing,
      game,
      pitch
    } = this.props;

    const {
      date,
      time,
      teamAScore,
      teamBScore
    } = game;

    const {
      id: pitchId,
      name: pitchName
    } = pitch;

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
            text={String(teamAScore === undefined ? '' : teamAScore)}
            maxLength="2"
            onChange={this.onGameScoreAChanged} />

          <span> : </span>

          <EditableText
            className="team-score score-b"
            isEditing={isEditing}
            text={String(teamBScore === undefined ? '' : teamBScore)}
            maxLength="2"
            onChange={this.onGameScoreBChanged} />
        </div>

        <div className="details">
          <Link to={`/pitches/${pitchId}`}>
            {pitchName}
          </Link>
        </div>

        <div className="details">
          {date}
        </div>

        <div className="details">
          {time}
        </div>
      </div>
    );
  }
}
