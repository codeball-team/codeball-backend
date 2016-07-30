import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { PERMISSION_ADD_USER } from 'constants';
import { NewUserModel } from 'models';
import { Link } from 'react-router';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import { NewPlayerSection } from 'components/sections';
import { Button } from 'components/ui';

class NewPlayer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
    newUser: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { newUserReset, redirect }, hasPermission } = this.props;
    if (!hasPermission(PERMISSION_ADD_USER)) {
      redirect('/unauthorized');
    }
    newUserReset();
  };

  onEmailChange = email => {
    const { actions: { newUserChangeEmail } } = this.props;
    newUserChangeEmail(email);
  };

  onFirstNameChange = firstName => {
    const { actions: { newUserChangeFirstName } } = this.props;
    newUserChangeFirstName(firstName);
  };

  onLastNameChange = lastName => {
    const { actions: { newUserChangeLastName } } = this.props;
    newUserChangeLastName(lastName);
  };

  onRoleChange = role => {
    const { actions: { newUserChangeRole } } = this.props;
    newUserChangeRole(role);
  };

  onSubmit = () => {
    const { actions: { newUserSubmit }, newUser } = this.props;
    newUserSubmit(newUser);
  };

  render() {
    const { newUser } = this.props;
    const {
      email,
      firstName,
      lastName,
      role
    } = newUser;

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
              isDisabled={!NewUserModel.isValid(newUser)}
              onClick={this.onSubmit}>
              <IconSave className="icon" />
              <span className="label">Save</span>
            </Button>
          ]}
          onEmailChange={this.onEmailChange}
          onFirstNameChange={this.onFirstNameChange}
          onLastNameChange={this.onLastNameChange}
          onRoleChange={this.onRoleChange}
          onSubmit={this.onSubmit} />
      </section>
    );
  }
}

export default bindActionsAndConnect(NewPlayer, state => ({
  newUser: state.newUser
}));
