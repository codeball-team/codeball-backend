import React, { Component, PropTypes } from 'react';
import { findById } from 'utils';
import { PERMISSION_ADD_PITCH } from 'constants';
import { pitchSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { PitchInfoSection } from 'components/sections';
import { PitchNotLoaded } from 'components/codeball';

class Pitch extends Component {
  static propTypes = {
    hasPermission: PropTypes.func.isRequired,
    hasPitchLoaded: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    pitches: PropTypes.array.isRequired
  };

  render() {
    const {
      hasPermission,
      hasPitchLoaded,
      params: { id: pitchId },
      pitches
    } = this.props;

    const pitch = findById(pitches, Number(pitchId));
    const { name } = pitch;

    return (
      <section>
        <PitchNotLoaded
          renderWhen={!hasPitchLoaded}
          canAddNew={hasPermission(PERMISSION_ADD_PITCH)} />

        <PitchInfoSection
          renderWhen={hasPitchLoaded}
          title={name}
          pitch={pitch} />
      </section>
    );
  }
}

export default ContainerComponent(Pitch, {
  mapStateToProps: pitchSelector,
  updateData: ({ actions }) => {
    actions.pitchesLoad();
  }
});
