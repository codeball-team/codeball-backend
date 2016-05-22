import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { Section } from 'components/ui';
import './GameScore.scss';

export default class GameScore extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitchId: PropTypes.number.isRequired,
    pitchName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    teamAScore: PropTypes.number,
    teamBScore: PropTypes.number
  };

  render() {
    const {
      className,
      pitchId,
      pitchName,
      date,
      time,
      teamAScore,
      teamBScore
    } = this.props;

    return (
      <Section
        title="Result"
        className={classNames(
          'game-score',
          className
        )}>
        <div className="score">
          {this.renderScore(teamAScore)} : {this.renderScore(teamBScore)}
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
      </Section>
    );
  }

  renderScore(score) {
    return (score !== undefined && score !== null)
      ? score
      : '-';
  }
}
