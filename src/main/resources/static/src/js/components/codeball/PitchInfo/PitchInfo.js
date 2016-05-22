import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconLocation from 'react-icons/lib/io/ios-location';
import IconWorld from 'react-icons/lib/io/ios-world-outline';
import IconPeople from 'react-icons/lib/io/ios-people';
import IconLayers from 'react-icons/lib/io/social-buffer';
import { PITCH_TYPE_STRING, mapsUrl } from 'constants/Configuration';
import { getDomain } from 'constants/RegExps';
import './PitchInfo.scss';

export default class PitchInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitch: PropTypes.object.isRequired
  };

  render() {
    const {
      className,
      pitch
    } = this.props;

    const {
      address,
      url,
      type,
      minNumberOfPlayers,
      maxNumberOfPlayers
    } = pitch;

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

        {url && (
          <div className="ellipsis" title="Pitch webpage">
            <IconWorld className="icon" />
            <a href={url}>
              {getDomain(url)}
            </a>
          </div>
        )}

        {PITCH_TYPE_STRING[type] && (
          <div className="ellipsis" title="Pitch type">
            <IconLayers className="icon" />
            {PITCH_TYPE_STRING[type]}
          </div>
        )}

        <div title="Pitch capacity">
          <IconPeople className="icon" />
          {
            minNumberOfPlayers === maxNumberOfPlayers
              ? `${minNumberOfPlayers}`
              : `${minNumberOfPlayers} - ${maxNumberOfPlayers}`
          }
        </div>
      </div>
    );
  }
}
