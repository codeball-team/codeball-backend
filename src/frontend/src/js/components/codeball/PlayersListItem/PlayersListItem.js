import React, { Component, PropTypes } from 'react';
import { classNames } from 'utils';
import { USER_MISSING_PICTURE_URL } from 'constants';
import { BaseComponent } from 'components/base';
import { Link, ListItem } from 'components/ui';
import './PlayersListItem.scss';

class PlayersListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      children,
      className,
      user: {
        firstName,
        id,
        lastName,
        pictureUrl
      }
    } = this.props;

    return (
      <Link key={id} to={`/players/${id}`}>
        <ListItem
          className={classNames(
            'players-list-item',
            className
          )}>
          <div
            className="picture"
            style={{
              backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
            }} />

          <div className="name ellipsis">
            {lastName} {firstName}
          </div>

          {children}
        </ListItem>
      </Link>
    );
  }
}

export default BaseComponent(PlayersListItem);
