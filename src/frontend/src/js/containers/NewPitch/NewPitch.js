import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_PITCH } from 'constants';
import { NewPitchModel } from 'models';
import { Container } from 'components/base';
import { NewPitchSection } from 'components/sections';
import { ButtonCancel, ButtonSave } from 'components/ui';

class NewPitch extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    newPitch: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { newPitchReset, redirect }, hasPermission } = this.props;
    if (!hasPermission(PERMISSION_ADD_PITCH)) {
      redirect('/unauthorized');
    }
    newPitchReset();
  };

  onAddressChange = address => {
    const { actions: { newPitchChangeAddress } } = this.props;
    newPitchChangeAddress(address);
  };

  onMinNumberOfPlayersChange = minNumberOfPlayers => {
    const { actions: { newPitchChangeMinNumberOfPlayers } } = this.props;
    newPitchChangeMinNumberOfPlayers(minNumberOfPlayers);
  };

  onMaxNumberOfPlayersChange = maxNumberOfPlayers => {
    const { actions: { newPitchChangeMaxNumberOfPlayers } } = this.props;
    newPitchChangeMaxNumberOfPlayers(maxNumberOfPlayers);
  };

  onNameChange = name => {
    const { actions: { newPitchChangeName } } = this.props;
    newPitchChangeName(name);
  };

  onTypeChange = type => {
    const { actions: { newPitchChangeType } } = this.props;
    newPitchChangeType(type);
  };

  onSubmit = () => {
    const { actions: { newPitchSubmit }, newPitch } = this.props;
    newPitchSubmit(newPitch);
  };

  render() {
    const { newPitch } = this.props;
    const {
      address,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      name,
      type
    } = newPitch;

    return (
      <section className="new-pitch">
        <NewPitchSection
          title="New pitch"
          address={address}
          minNumberOfPlayers={minNumberOfPlayers}
          maxNumberOfPlayers={maxNumberOfPlayers}
          name={name}
          type={type}
          buttons={[
            <ButtonCancel
              key="cancel"
              redirect="/pitches" />,

            <ButtonSave
              key="save"
              isDisabled={!NewPitchModel.isValid(newPitch)}
              onClick={this.onSubmit} />
          ]}
          onAddressChange={this.onAddressChange}
          onMinNumberOfPlayersChange={this.onMinNumberOfPlayersChange}
          onMaxNumberOfPlayersChange={this.onMaxNumberOfPlayersChange}
          onNameChange={this.onNameChange}
          onTypeChange={this.onTypeChange}
          onSubmit={this.onSubmit} />
      </section>
    );
  }
}

export default Container(NewPitch, state => ({
  newPitch: state.newPitch
}));
