import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_GAME } from 'constants';
import { newGameContainerSelector } from 'selectors/containers';
import { NewGameModel } from 'models';
import { ContainerComponent } from 'components/base';
import { NewGameSection } from 'components/sections';
import { ButtonCancel, ButtonSave } from 'components/ui';

class NewGame extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    newGame: PropTypes.object.isRequired,
    pitches: PropTypes.array.isRequired
  };

  componentWillMount = () => {
    const { actions: { newGameReset, redirect }, hasPermission } = this.props;
    if(hasPermission(PERMISSION_ADD_GAME)) {
      newGameReset();
    } else {
      redirect('/unauthorized');
    }
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
    const { newGame, pitches } = this.props;

    return (
      <main>
        <NewGameSection
          title="New game"
          newGame={newGame}
          pitches={pitches}
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
      </main>
    );
  }
}

export default ContainerComponent(NewGame, {
  mapStateToProps: newGameContainerSelector,
  periodicDataUpdates: true,
  updateData: ({ actions }) => {
    actions.currentUserLoad();
    actions.pitchesLoad();
  }
});
