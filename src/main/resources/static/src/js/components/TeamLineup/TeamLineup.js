import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import './TeamLineup.scss';

export default class TeamLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    teamName: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      teamName,
      users,
      team
    } = this.props;

    const teamUsers = _(
      _(team).map(userId => users[userId])
    ).compact();
    const sortedTeamUsers = _(teamUsers).sortBy('name');

    return (
      <div
        className={classNames(
          'team-lineup',
          'ellipsis',
          className
        )}>
        <div className="team-name">
          {teamName}
        </div>

        <div className="players">
          {_(sortedTeamUsers).map((user, index) => {
            const {
              id,
              name
            } = user;

            return (
              <div
                key={id}
                className="player ellipsis">
                {name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
