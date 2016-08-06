import React, { Component, PropTypes } from 'react';
import { ConditionalRender } from 'components/base';
import { Link, ListItem } from 'components/ui';

class PitchesListItem extends Component {
  static propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    pitch: PropTypes.object.isRequired
  };

  render() {
    const {
      children,
      className,
      pitch: {
        address,
        id,
        name
      }
    } = this.props;

    return (
      <Link className={className} key={id} to={`/pitches/${id}`}>
        <ListItem className="pitches-list-item">
          <div className="name">
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

export default ConditionalRender(PitchesListItem);
