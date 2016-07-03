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

  render() {
    const {
      actions: {
        newGameChangeDate,
        newGameChangeDuration,
        newGameChangeHour,
        newGameChangeMinute,
        newGameChangePitchId,
        newGameSubmit
      },
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
                  onClick={() => newGameSubmit(newGame)}>
                  <IconSave className="icon" />
                  <span className="label">Save</span>
                </Button>
              ]}
              onDateChange={(date) => newGameChangeDate(date)}
              onDurationChange={(duration) => newGameChangeDuration(duration)}
              onHourChange={(hour) => newGameChangeHour(hour)}
              onMinuteChange={(minute) => newGameChangeMinute(minute)}
              onPitchIdChange={(pitchId) => newGameChangePitchId(pitchId)} />
          </section>
        )} />
    );
  }
}

export default bindActionsAndConnect(NewGame, state => ({
  newGame: state.newGame,
  pitchesData: state.pitchesData
}));
