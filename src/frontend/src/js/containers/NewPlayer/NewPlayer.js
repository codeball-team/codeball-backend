import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_USER, ROLE_OPTIONS } from 'constants';
import { NewUserModel } from 'models';
import { Container } from 'components/base';
import { NewPlayerSection } from 'components/sections';
import { ButtonCancel, ButtonSave } from 'components/ui';

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
    const { hasPermission, newUser } = this.props;
    const rule = hasPermission(PERMISSION_ADD_USER);
    const roleOptions = ROLE_OPTIONS.filter(({ value }) => rule.includes(value));

    return (
      <section className="new-player">
        <NewPlayerSection
          title="New player"
          newUser={newUser}
          roleOptions={roleOptions}
          buttons={[
            <ButtonCancel
              key="cancel"
              redirect="/players" />,

            <ButtonSave
              key="save"
              isDisabled={!NewUserModel.isValid(newUser)}
              onClick={this.onSubmit} />
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

export default Container(NewPlayer, state => ({
  newUser: state.newUser
}));
