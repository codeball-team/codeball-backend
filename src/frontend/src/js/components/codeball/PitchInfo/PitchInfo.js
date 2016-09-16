import React, { Component, PropTypes } from 'react';
import { PITCH_TYPE_STRING } from 'constants';
import { _, classNames } from 'utils';
import { BaseComponent } from 'components/base';
import PitchAddress from './PitchAddress';
import PitchCapacity from './PitchCapacity';
import PitchType from './PitchType';
import PitchWebpage from './PitchWebpage';
import './PitchInfo.scss';

class PitchInfo extends Component {
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

    return (
      <div
        className={classNames(
          'pitch-info',
          className
        )}>
        <PitchAddress address={address} />
        <PitchWebpage
          renderWhen={!_.isUndefined(url)}
          url={url} />
        <PitchType
          renderWhen={!_.isUndefined(PITCH_TYPE_STRING[type])}
          type={type} />
        <PitchCapacity
          minNumberOfPlayers={minNumberOfPlayers}
          maxNumberOfPlayers={maxNumberOfPlayers} />
      </div>
    );
  }
}

export default BaseComponent(PitchInfo);
