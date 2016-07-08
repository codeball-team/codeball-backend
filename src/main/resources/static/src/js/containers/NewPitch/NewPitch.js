import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { PERMISSION_ADD_PITCH } from 'constants';
import { NewPitchModel } from 'models';
import { Link } from 'react-router';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import { NewPitchSection } from 'components/sections';
import { Button } from 'components/ui';

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
      name
    } = newPitch;

    return (
      <section className="new-pitch">
        <NewPitchSection
          title="New pitch"
          address={address}
          minNumberOfPlayers={minNumberOfPlayers}
          maxNumberOfPlayers={maxNumberOfPlayers}
          name={name}
          buttons={[
            <Link key="cancel" to="/pitches">
              <Button>
                <IconCancel className="icon" />
                <span className="label">Cancel</span>
              </Button>
            </Link>,
            <Button
              key="save"
              isDisabled={!NewPitchModel.isValid(newPitch)}
              onClick={this.onSubmit}>
              <IconSave className="icon" />
              <span className="label">Save</span>
            </Button>
          ]}
          onAddressChange={this.onAddressChange}
          onMinNumberOfPlayersChange={this.onMinNumberOfPlayersChange}
          onMaxNumberOfPlayersChange={this.onMaxNumberOfPlayersChange}
          onNameChange={this.onNameChange} />
      </section>
    );
  }
}

export default bindActionsAndConnect(NewPitch, state => ({
  newPitch: state.newPitch
}));
