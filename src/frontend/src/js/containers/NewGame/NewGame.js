import React, { Component, PropTypes } from 'react';
import { _ } from 'utils';
import { PERMISSION_ADD_GAME } from 'constants';
import { NewGameModel } from 'models';
import { Container } from 'components/base';
import { ButtonCancel, ButtonSave, LoadableContent } from 'components/ui';
import { NewGameSection } from 'components/sections';

class NewGame extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    newGame: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    refreshDataIfNecessary: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const {
      refreshDataIfNecessary,
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
    const { actions: { newGameChangeDate, redirect }, hasPermission } = this.props;
    if (!hasPermission(PERMISSION_ADD_GAME)) {
      redirect('/unauthorized');
    }
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

    return (
      <LoadableContent isLoading={arePitchesLoading}>
        <section className="new-game">
          <NewGameSection
            title="New game"
            newGame={newGame}
            pitches={_(pitches).values()}
            buttons={[
              <ButtonCancel
                key="cancel"
                redirect="/games" />,

              <ButtonSave
                key="save"
                isDisabled={!NewGameModel.isValid(newGame)}
                onClick={this.onSubmit} />
            ]}
            onDateChange={this.onDateChange}
            onDurationChange={this.onDurationChange}
            onHourChange={this.onHourChange}
            onMinuteChange={this.onMinuteChange}
            onPitchIdChange={this.onPitchIdChange}
            onSubmit={this.onSubmit} />
        </section>
      </LoadableContent>
    );
  }
}

export default Container(NewGame, state => ({
  newGame: state.newGame,
  pitchesData: state.pitchesData
}));
