import React, { Component, PropTypes } from 'react';
import { findById, safeGet } from 'utils';
import { Container } from 'components/base';
import { LoadableContent } from 'components/ui';
import { PitchInfoSection } from 'components/sections';

class Pitch extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
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
      params: { pitchId },
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      }
    } = this.props;

    const pitch = findById(pitches, Number(pitchId));
    const name = safeGet(pitch, ['name']);

    return (
      <LoadableContent
        isLoading={arePitchesLoading}
        render={() => (
          <PitchInfoSection
            title={name}
            pitch={pitch} />
        )} />
    );
  }
}

export default Container(Pitch, state => ({
  pitchesData: state.pitchesData
}));
