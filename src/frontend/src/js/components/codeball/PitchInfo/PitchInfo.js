import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { renderConditionally } from 'utils';
import { PITCH_TYPE_STRING, getDomain, mapsUrl } from 'constants';
import IconLocation from 'react-icons/lib/io/ios-location';
import IconWorld from 'react-icons/lib/io/ios-world-outline';
import IconPeople from 'react-icons/lib/io/ios-people';
import IconLayers from 'react-icons/lib/io/social-buffer';
import './PitchInfo.scss';

export default class PitchInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitch: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      pitch: {
        address,
        url,
        type,
        minNumberOfPlayers,
        maxNumberOfPlayers
      }
    } = this.props;

    const capacity = minNumberOfPlayers === maxNumberOfPlayers
      ? `${minNumberOfPlayers}`
      : `${minNumberOfPlayers} - ${maxNumberOfPlayers}`;

    return (
      <div
        className={classNames(
          'pitch',
          className
        )}>
        <div className="ellipsis" title="Pitch address">
          <IconLocation className="icon" />
          <a href={mapsUrl(address)}>
            {address}
          </a>
        </div>

        {renderConditionally({
          when: !_.isUndefined(url),
          render: () => (
            <div className="ellipsis" title="Pitch webpage">
              <IconWorld className="icon" />
              <a href={url}>
                {getDomain(url)}
              </a>
            </div>
          )
        })}

        {renderConditionally({
          when: !_.isUndefined(PITCH_TYPE_STRING[type]),
          render: () => (
            <div className="ellipsis" title="Pitch type">
              <IconLayers className="icon" />
              <a href="http://www.worldsoccershop.com/buyers-guide-boots.html">
                {PITCH_TYPE_STRING[type]}
              </a>
            </div>
          )
        })}

        <div title="Pitch capacity">
          <IconPeople className="icon" />
          {capacity}
        </div>
      </div>
    );
  }
}
