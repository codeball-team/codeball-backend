import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconEmail from 'react-icons/lib/io/ios-email-outline';
import IconAccessLevel from 'react-icons/lib/io/key';
import { ROLE_STRING, USER_MISSING_PICTURE_URL } from 'constants/Configuration';
import { Section } from 'components/ui';
import './PlayerProfile.scss';

export default class PlayerProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.any.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string,
    role: PropTypes.string.isRequired
  };

  render() {
    const {
      className,
      firstName,
      lastName,
      email,
      pictureUrl,
      role
    } = this.props;

    return (
      <Section
        title={`${firstName} ${lastName}`}
        className={classNames(
          'player-profile',
          className
        )}>
        <a href={pictureUrl}>
          <div
            className="picture"
            style={{
              backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
            }} />
        </a>

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
      </Section>
    );
  }
}
