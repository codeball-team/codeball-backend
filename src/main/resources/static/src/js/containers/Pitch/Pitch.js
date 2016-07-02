import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { safeGet } from 'utils';
import * as codeballActions from 'actions';
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

  componentWillReceiveProps = (newProps) => {
    if (safeGet(newProps, 'params.pitchId') !== safeGet(this.props, 'params.pitchId')) {
      this.updateData();
    }
  };

  updateData = () => {
    const { actions: { pitchesLoad } } = this.props;
    pitchesLoad();
  };

  render () {
    const {
      params,
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      }
    } = this.props;
    const pitch = pitches[params.pitchId];
    const { name } = pitch;

    return (
      <LoadableContent
        isLoading={arePitchesLoading}
        render={() => (
          <section className="pitch">
            <PitchInfoSection
              title={name}
              pitch={pitch} />
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
    actions: bindActionCreators(codeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pitch);
