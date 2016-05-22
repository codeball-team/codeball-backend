import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { safeGet } from 'utils';
import { LoadableContent, Section }  from 'components/ui';
import { PitchInfo }  from 'components/codeball';

class Pitch extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    pitchesData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    this.updateData();
  };

  componentWillReceiveProps = (newProps) => {
    if (safeGet(newProps, 'params.pitchId') !== safeGet(this.props, 'params.pitchId')) {
      this.updateData();
    }
  };

  updateData = () => {
    const { actions } = this.props;
    actions.loadPitches();
  };

  render () {
    const {
      pitchesData,
      params
    } = this.props;
    const { pitches } = pitchesData;
    const pitch = pitches[params.pitchId];
    const {
      name,
      address,
      url,
      type,
      minNumberOfPlayers,
      maxNumberOfPlayers
    } = pitch;

    const isContentLoading = _.any([
      pitchesData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section className="pitch">
          <Section
            title={name}
            className="pitch">
            <PitchInfo
              address={address}
              url={url}
              type={type}
              minNumberOfPlayers={minNumberOfPlayers}
              maxNumberOfPlayers={maxNumberOfPlayers} />
          </Section>
        </section>
      </LoadableContent>
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
)(Pitch);
