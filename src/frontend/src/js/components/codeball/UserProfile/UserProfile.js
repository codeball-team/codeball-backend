import React, { Component, PropTypes } from 'react';
import { ROLE_STRING, USER_MISSING_PICTURE_URL } from 'constants';
import { classNames } from 'utils';
import { BaseComponent } from 'components/base';
import { Icon } from 'components/ui';
import './UserProfile.scss';

class UserProfile extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      user: {
        email,
        pictureUrl,
        role
      }
    } = this.props;

    return (
      <div
        className={classNames(
          'user-profile',
          className
        )}>
        <div
          className="picture"
          style={{
            backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
          }} />

        <div className="info">
          <div className="ellipsis" title="Role">
            <Icon name="access" />
            {ROLE_STRING[role]}
          </div>

          <div className="ellipsis" title="Email">
            <Icon name="email" />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BaseComponent(UserProfile);
