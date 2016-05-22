import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconLocation from 'react-icons/lib/io/ios-location';
import IconWorld from 'react-icons/lib/io/ios-world-outline';
import IconPeople from 'react-icons/lib/io/ios-people';
import IconLayers from 'react-icons/lib/io/social-buffer';
import { PITCH_TYPE_STRING } from 'constants/Configuration';
import { getDomain } from 'constants/RegExps';
import { Section } from 'components/ui';
import './Pitch.scss';

export default class Pitch extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    url: PropTypes.string,
    type: PropTypes.string,
    minNumberOfPlayers: PropTypes.number.isRequired,
    maxNumberOfPlayers: PropTypes.number.isRequired
  };

  render() {
    const {
      className,
      name,
      address,
      url,
      type,
      minNumberOfPlayers,
      maxNumberOfPlayers
    } = this.props;

    return (
      <Section
        title={name}
        className={classNames(
          'pitch',
          className
        )}>
        <div>
          <IconLocation className="icon" />
          {address}
        </div>

        {url && (
          <div>
            <IconWorld className="icon" />
            <a href={url}>
              {getDomain(url)}
            </a>
          </div>
        )}

        {PITCH_TYPE_STRING[type] && (
          <div>
            <IconLayers className="icon" />
            {PITCH_TYPE_STRING[type]}
          </div>
        )}

        <div>
          <IconPeople className="icon" />
          {
            minNumberOfPlayers === maxNumberOfPlayers
              ? `${minNumberOfPlayers}`
              : `${minNumberOfPlayers} - ${maxNumberOfPlayers}`
          }
        </div>
      </Section>
    );
  }
}
