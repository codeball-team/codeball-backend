import React, { Component, PropTypes } from 'react';
import { USER_MISSING_PICTURE_URL } from 'constants';
import { Link } from 'react-router';
import { ListItem } from 'components/ui';
import './PlayersListItem.scss';

export default class PlayersListItem extends Component {
  static propTypes = {
    children: PropTypes.element,
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
      <Link className={className} key={id} to={`/players/${id}`}>
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
