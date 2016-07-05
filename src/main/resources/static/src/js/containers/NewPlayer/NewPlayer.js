import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { NewPlayerModel } from 'models';
import { Link } from 'react-router';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import { NewPlayerSection } from 'components/sections';
import { Button } from 'components/ui';

class NewPlayer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    newPlayer: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { newPlayerReset } } = this.props;
    newPlayerReset();
  };

  onEmailChange = email => {
    const { actions: { newPlayerChangeEmail } } = this.props;
    newPlayerChangeEmail(email);
  };

  onFirstNameChange = firstName => {
    const { actions: { newPlayerChangeFirstName } } = this.props;
    newPlayerChangeFirstName(firstName);
  };

  onLastNameChange = lastName => {
    const { actions: { newPlayerChangeLastName } } = this.props;
    newPlayerChangeLastName(lastName);
  };

  onRoleChange = role => {
    const { actions: { newPlayerChangeRole } } = this.props;
    newPlayerChangeRole(role);
  };

  onSubmit = () => {
    const { actions: { newPlayerSubmit }, newPlayer } = this.props;
    newPlayerSubmit(newPlayer);
  };

  render() {
    const { newPlayer } = this.props;
    const {
      email,
      firstName,
      lastName,
      role
    } = newPlayer;

    return (
      <section className="new-player">
        <NewPlayerSection
          title="New player"
          email={email}
          firstName={firstName}
          lastName={lastName}
          role={role}
          buttons={[
            <Link key="cancel" to="/players">
              <Button>
                <IconCancel className="icon" />
                <span className="label">Cancel</span>
              </Button>
            </Link>,
            <Button
              key="save"
              isDisabled={!NewPlayerModel.isValid(newPlayer)}
              onClick={this.onSubmit}>
              <IconSave className="icon" />
              <span className="label">Save</span>
            </Button>
          ]}
          onEmailChange={this.onEmailChange}
          onFirstNameChange={this.onFirstNameChange}
          onLastNameChange={this.onLastNameChange}
          onRoleChange={this.onRoleChange} />
      </section>
    );
  }
}

export default bindActionsAndConnect(NewPlayer, state => ({
  newPlayer: state.newPlayer
}));
