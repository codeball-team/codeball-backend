import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_PITCH } from 'constants';
import { findById, safeGet } from 'utils';
import { Container } from 'components/base';
import { LoadableContent } from 'components/ui';
import { PitchInfoSection } from 'components/sections';
import { PitchNotLoaded } from 'components/codeball';

class Pitch extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    params: PropTypes.object,
    pitchesData: PropTypes.object.isRequired,
    refreshDataIfNecessary: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    this.updateData();
  };

  componentWillReceiveProps = newProps => {
    const pitchIdPath = ['params', 'pitchId'];
    if (safeGet(newProps, pitchIdPath) !== safeGet(this.props, pitchIdPath)) {
      this.updateData();
    }
  };

  updateData = () => {
    const {
      refreshDataIfNecessary,
      actions: { pitchesLoad },
      pitchesData
    } = this.props;
    refreshDataIfNecessary(pitchesData, pitchesLoad);
  };

  render() {
    const {
      hasPermission,
      params: { pitchId },
      pitchesData: {
        pitches,
        hasLoaded: hasPlayerLoaded,
        isLoading: arePitchesLoading
      }
    } = this.props;

    const pitch = findById(pitches, Number(pitchId));
    const name = safeGet(pitch, ['name']);

    return (
      <LoadableContent isLoading={arePitchesLoading}>
        <PitchNotLoaded
          renderWhen={!hasPlayerLoaded}
          canAddNew={hasPermission(PERMISSION_ADD_PITCH)} />

        <PitchInfoSection
          renderWhen={hasPlayerLoaded}
          title={name}
          pitch={pitch} />
      </LoadableContent>
    );
  }
}

export default Container(Pitch, state => ({
  pitchesData: state.pitchesData
}));
