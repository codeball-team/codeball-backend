import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { PitchesListSection } from 'components/sections';

class Pitches extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions } = this.props;
    actions.loadPitches();
  };

  render () {
    const { pitchesData } = this.props;
    const { pitches } = pitchesData;
    const numberOfPitches = _(pitches).keys().length;

    const isContentLoading = _.any([
      pitchesData.isLoading
    ]);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="pitches">
            {numberOfPitches > 0 && (
              <PitchesListSection
                title={`Pitches (${numberOfPitches})`}
                pitches={pitches}
                buttons={[
                  <Link key="new" to="pitches/new">
                    <Button>
                      <IconAdd className="icon" />
                      <span className="label">Add</span>
                    </Button>
                  </Link>
                ]} />
            )}
          </section>
        )} />
    );
  }
}

function mapStateToProps(state) {
  return {
    pitchesData: state.pitchesData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CodeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pitches);
