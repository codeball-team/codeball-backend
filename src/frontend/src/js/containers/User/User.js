import React, { Component, PropTypes } from 'react';
import { findById } from 'utils';
import { PERMISSION_ADD_USER } from 'constants';
import { userSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { UserProfileSection } from 'components/sections';
import { UserNotLoaded } from 'components/codeball';

class User extends Component {
  static propTypes = {
    hasPermission: PropTypes.func.isRequired,
    hasUserLoaded: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  };

  render() {
    const {
      hasPermission,
      hasUserLoaded,
      params: { id: userId },
      users
    } = this.props;

    const user = findById(users, Number(userId));
    const { firstName, lastName } = user;

    return (
      <section>
        <UserNotLoaded
          renderWhen={!hasUserLoaded}
          canAddNew={hasPermission(PERMISSION_ADD_USER)} />

        <UserProfileSection
          renderWhen={hasUserLoaded}
          title={`${lastName} ${firstName}`}
          user={user} />
      </section>
    );
  }
}

export default ContainerComponent(User, {
  mapStateToProps: userSelector,
  updateData: ({ actions }) => {
    actions.usersLoad();
  }
});
