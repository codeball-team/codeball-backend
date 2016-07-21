import React, { Component, PropTypes } from 'react';
import PlayersListItem from '../PlayersListItem/PlayersListItem';
import classNames from 'classnames';

export default class GameEnrollmentListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    enrollmentStatus: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      enrollmentStatus,
      user
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
