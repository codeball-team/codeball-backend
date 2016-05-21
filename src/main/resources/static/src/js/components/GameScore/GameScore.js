import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import { Section } from 'components';
import './GameScore.scss';

export default class GameScore extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitchName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    teamAScore: PropTypes.number,
    teamBScore: PropTypes.number
  };

  render() {
    const {
      className,
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
          {pitchName}
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
