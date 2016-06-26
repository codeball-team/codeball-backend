import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { isNewGameValid } from 'models/newGame';
import { Link } from 'react-router';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import { Button, LoadableContent } from 'components/ui';
import { NewGameSection } from 'components/sections';

class NewGame extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    newGame: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      pitchesData
    } = this.props;

    actions.newGameReset();
    refreshDataIfNecessary(pitchesData, actions.loadPitches);
  };

  render () {
    const {
      actions,
      newGame,
      pitchesData
    } = this.props;
    const {
      date,
      duration,
      hour,
      minute,
      pitchId
    } = newGame;
    const { pitches } = pitchesData;

    const isContentLoading = _.any([
      pitchesData.isLoading
    ]);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="new-game">
            <NewGameSection
              title="New game"
              date={date}
              duration={duration}
              minute={minute}
              hour={hour}
              pitches={_(pitches).values()}
              pitchId={pitchId}
              buttons={[
                <Link key="cancel" to="/games">
                  <Button>
                    <IconCancel className="icon" />
                    <span className="label">Cancel</span>
                  </Button>
                </Link>,
                <Button
                  key="save"
                  isDisabled={!isNewGameValid(newGame)}
                  onClick={() => actions.addGame(newGame)}>
                  <IconSave className="icon" />
                  <span className="label">Save</span>
                </Button>
              ]}
              onDateChange={(date) => actions.newGameChangeDate(date)}
              onDurationChange={(duration) => actions.newGameChangeDuration(duration)}
              onHourChange={(hour) => actions.newGameChangeHour(hour)}
              onMinuteChange={(minute) => actions.newGameChangeMinute(minute)}
              onPitchIdChange={(pitchId) => actions.newGameChangePitchId(pitchId)} />
          </section>
        )} />
    );
  }
}

function mapStateToProps(state) {
  return {
    newGame: state.newGame,
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
)(NewGame);
