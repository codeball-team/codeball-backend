import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_USER, ROLE_OPTIONS } from 'constants';
import { newUserContainerSelector } from 'selectors/containers';
import { NewUserModel } from 'models';
import { ContainerComponent } from 'components/base';
import { NewUserSection } from 'components/sections';
import { ButtonCancel, ButtonSave } from 'components/ui';

class NewUser extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    getPermission: PropTypes.func.isRequired,
    hasPermission: PropTypes.func.isRequired,
    newUser: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { newUserReset, redirect }, hasPermission } = this.props;
    if(hasPermission(PERMISSION_ADD_USER)) {
      newUserReset();
    } else {
      redirect('/unauthorized');
    }
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
    const { getPermission, newUser } = this.props;
    const rule = getPermission(PERMISSION_ADD_USER);
    const roleOptions = ROLE_OPTIONS.filter(({ value }) => rule.includes(value));

    return (
      <main>
        <NewUserSection
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
      </main>
    );
  }
}

export default ContainerComponent(NewUser, {
  mapStateToProps: newUserContainerSelector,
  periodicDataUpdates: true,
  updateData: ({ actions }) => {
    actions.currentUserLoad();
  }
});
