import React, { Component, PropTypes } from 'react';
import { _ } from 'utils';
import { PERMISSION_ADD_PITCH } from 'constants';
import { ContainerComponent } from 'components/base';
import { LoadableContent } from 'components/ui';
import { PitchesListSection } from 'components/sections';
import { ButtonAddPitch } from 'components/codeball';

class Pitches extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    pitchesData: PropTypes.object.isRequired,
    refreshDataIfNecessary: PropTypes.func.isRequired
  };

  componentWillMount = () => {
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
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      }
    } = this.props;

    return (
      <LoadableContent isLoading={arePitchesLoading}>
        <section className="pitches">
          <PitchesListSection
            title={`Pitches (${pitches.length})`}
            pitches={_(pitches).values()}
            buttons={[
              <ButtonAddPitch key="add" renderWhen={hasPermission(PERMISSION_ADD_PITCH)} />
            ]} />
        </section>
      </LoadableContent>
    );
  }
}

export default ContainerComponent(Pitches, state => ({
  pitchesData: state.pitchesData
}));
