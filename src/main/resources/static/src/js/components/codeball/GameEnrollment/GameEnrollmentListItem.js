import React, { Component, PropTypes } from 'react';
import { ListItem } from 'components/ui';
import PlayersListItem from '../PlayersListItem/PlayersListItem';
import classNames from 'classnames';

export default class GameEnrollmentListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
    enrollmentStatus: PropTypes.string.isRequired
  };

  render() {
    const {
      className,
      user,
      enrollmentStatus
    } = this.props;

    return (
      <PlayersListItem
        user={user}
        className={classNames(
          'game-enrollment-list-item',
          className
        )}>
        <div className="enrollment-status">
          {enrollmentStatus}
        </div>
      </PlayersListItem>
    );
  }
}
