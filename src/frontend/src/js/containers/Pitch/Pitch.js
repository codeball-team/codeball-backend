import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, safeGet } from 'utils';
import { LoadableContent } from 'components/ui';
import { PitchInfoSection } from 'components/sections';

class Pitch extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    pitchesData: PropTypes.object.isRequired
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
    const { actions: { pitchesLoad } } = this.props;
    pitchesLoad();
  };

  render() {
    const {
      params: { pitchId },
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      }
    } = this.props;

    const { [pitchId]: pitch } = pitches;
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

export default bindActionsAndConnect(Pitch, state => ({
  pitchesData: state.pitchesData
}));
