import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { UsersList } from 'components/codeball';
import './TeamLineup.scss';

class TeamLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    teamName: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const { className, teamName, users } = this.props;

    return (
      <div
        className={classNames(
          'team-lineup',
          'ellipsis',
          className
        )}>
        <div className="team-name ellipsis">
          {teamName}
        </div>

        <UsersList users={users} />
      </div>
    );
  }
}

export default BaseComponent(TeamLineup);
