import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconEmail from 'react-icons/lib/io/ios-email-outline';
import IconAccessLevel from 'react-icons/lib/io/key';
import { ROLE_STRING, USER_MISSING_PICTURE_URL } from 'constants/Configuration';
import './PlayerProfile.scss';

export default class PlayerProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      user
    } = this.props;

    const {
      email,
      pictureUrl,
      role
    } = user;

    return (
      <div
        className={classNames(
          'player-profile',
          className
        )}>
        <div
          className="picture"
          style={{
            backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
          }} />

        <div className="info">
          <div>
            <IconAccessLevel className="icon" />
            {ROLE_STRING[role]}
          </div>

          <div className="ellipsis">
            <IconEmail className="icon" />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </div>
    );
  }
}
