import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { Link } from 'react-router';
import './PlayersList.scss';

const USER_MISSING_PICTURE_URL = '/images/user-missing-picture.png';

export default class PlayersList extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      title,
      currentUser,
      users
    } = this.props;

    return (
      <div
        className={classNames(
          'players-list',
          className
        )}>
        <div className="title">
          {title}
        </div>

        <div className="player-entries">
          {_(users).map((user) => {
            const {
              id,
              firstName,
              lastName,
              pictureUrl,
              email
            } = user;

            return (
              <Link key={id} to={`players/${id}`}>
                <div className="player-entry">
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
                    }} />

                  <div className="name">
                    {firstName} {lastName}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
