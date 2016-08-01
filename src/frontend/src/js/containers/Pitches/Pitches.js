import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { bindActionsAndConnect, refreshDataIfNecessary, renderConditionally } from 'utils';
import { PERMISSION_ADD_PITCH } from 'constants';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { PitchesListSection } from 'components/sections';

class Pitches extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    pitchesData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { pitchesLoad }, pitchesData } = this.props;
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
      <LoadableContent
        isLoading={arePitchesLoading}
        render={() => (
          <section className="pitches">
            <PitchesListSection
              title={`Pitches (${pitches.length})`}
              pitches={_(pitches).values()}
              buttons={[
                renderConditionally({
                  when: hasPermission(PERMISSION_ADD_PITCH),
                  render: () => (
                    <Link key="new" to="pitches/new">
                      <Button>
                        <IconAdd className="icon" />
                        <span className="label">Add</span>
                      </Button>
                    </Link>
                  )
                })
              ]} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(Pitches, state => ({
  pitchesData: state.pitchesData
}));