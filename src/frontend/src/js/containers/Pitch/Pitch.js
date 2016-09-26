import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_PITCH } from 'constants';
import { pitchContainerSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { PitchInfoSection } from 'components/sections';
import { PitchNotLoaded } from 'components/codeball';

class Pitch extends Component {
  static propTypes = {
    hasPermission: PropTypes.func.isRequired,
    hasPitchLoaded: PropTypes.bool.isRequired,
    pitch: PropTypes.object.isRequired
  };

  render() {
    const {
      hasPermission,
      hasPitchLoaded,
      pitch,
      pitch: {
        name
      }
    } = this.props;

    return (
      <main>
        <PitchNotLoaded
          renderWhen={!hasPitchLoaded}
          canAddNew={hasPermission(PERMISSION_ADD_PITCH)} />

        <PitchInfoSection
          renderWhen={hasPitchLoaded}
          title={name}
          pitch={pitch} />
      </main>
    );
  }
}

export default ContainerComponent(Pitch, {
  mapStateToProps: pitchContainerSelector,
  periodicDataUpdates: true,
  updateData: ({ actions, ...props }) => {
    actions.currentUserLoad();
    actions.pitchLoad(props.params.id);
  }
});
