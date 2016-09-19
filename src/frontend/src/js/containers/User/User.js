import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_USER } from 'constants';
import { userSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { UserProfileSection } from 'components/sections';
import { UserNotLoaded } from 'components/codeball';

class User extends Component {
  static propTypes = {
    hasPermission: PropTypes.func.isRequired,
    hasUserLoaded: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      hasPermission,
      hasUserLoaded,
      user,
      user: {
        firstName,
        lastName
      }
    } = this.props;

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
  periodicDataUpdates: true,
  updateData: ({ actions, ...props }) => {
    actions.currentUserLoad();
    actions.userLoad(props.params.id);
  }
});
