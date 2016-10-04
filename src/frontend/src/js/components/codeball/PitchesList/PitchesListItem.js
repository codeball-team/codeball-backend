import React, { Component, PropTypes } from 'react';
import { BaseComponent } from 'components/base';
import { Link, ListItem } from 'components/ui';

class PitchesListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    pitch: PropTypes.object.isRequired
  };

  render() {
    const {
      children,
      pitch: {
        address,
        id,
        name
      }
    } = this.props;

    return (
      <Link to={`/pitches/${id}`}>
        <ListItem className="pitches-list-item">
          <div className="name ellipsis">
            {name}
          </div>

          <div className="address ellipsis">
            {address}
          </div>

          {children}
        </ListItem>
      </Link>
    );
  }
}

export default BaseComponent(PitchesListItem);
