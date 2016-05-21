import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { USER_MISSING_PICTURE_URL } from 'constants/Configuration';
import { ListItem } from 'components/ui';
import './PlayersListItem.scss';

export default class PlayersListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      children,
      user
    } = this.props;

    const {
      id,
      firstName,
      lastName,
      pictureUrl
    } = user;

    return (
      <Link key={id} to={`/players/${id}`}>
        <ListItem className="players-list-item">
          <div
            className="picture"
            style={{
              backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
            }} />

          <div className="name ellipsis">
            {firstName} {lastName}
          </div>

          {children}
        </ListItem>
      </Link>
    );
  }
}
