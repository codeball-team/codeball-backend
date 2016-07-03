import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { bindActionsAndConnect, refreshDataIfNecessary } from 'utils';
import { NewGameModel } from 'models';
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
      actions: {
        newGameReset,
        pitchesLoad
      },
      pitchesData
    } = this.props;

    newGameReset();
    refreshDataIfNecessary(pitchesData, pitchesLoad);
  };

  onDateChange = date => {
    const { actions: { newGameChangeDate } } = this.props;
    newGameChangeDate(date);
  };

  onDurationChange = duration => {
    const { actions: { newGameChangeDuration } } = this.props;
    newGameChangeDuration(duration);
  };

  onHourChange = hour => {
    const { actions: { newGameChangeHour } } = this.props;
    newGameChangeHour(hour);
  };

  onMinuteChange = minute => {
    const { actions: { newGameChangeMinute } } = this.props;
    newGameChangeMinute(minute);
  };

  onPitchIdChange = pitchId => {
    const { actions: { newGameChangePitchId } } = this.props;
    newGameChangePitchId(pitchId);
  };

  onSubmit = () => {
    const { actions: { newGameSubmit }, newGame } = this.props;
    newGameSubmit(newGame);
  };

  render() {
    const {
      newGame,
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      }
    } = this.props;
    const {
      date,
      duration,
      hour,
      minute,
      pitchId
    } = newGame;

    return (
      <LoadableContent
        isLoading={arePitchesLoading}
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
                  isDisabled={!NewGameModel.isValid(newGame)}
                  onClick={this.onSubmit}>
                  <IconSave className="icon" />
                  <span className="label">Save</span>
                </Button>
              ]}
              onDateChange={this.onDateChange}
              onDurationChange={this.onDurationChange}
              onHourChange={this.onHourChange}
              onMinuteChange={this.onMinuteChange}
              onPitchIdChange={this.onPitchIdChange} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(NewGame, state => ({
  newGame: state.newGame,
  pitchesData: state.pitchesData
}));
