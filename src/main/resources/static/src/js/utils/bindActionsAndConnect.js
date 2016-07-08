import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import safeGet from './safeGet';
import { ROLE_USER, ROLES_PERMISSIONS } from 'constants';
import * as actions from 'actions';

export default function bindActionsAndConnect(component, mapStateToProps) {
  return connect(
    enhancePropsWithHasPermissions(mapStateToProps),
    mapDispatchToProps
  )(component);
}

function enhancePropsWithHasPermissions(mapStateToProps) {
  return state => ({
    ...mapStateToProps(state),

    hasPermission: permission => {
      const role = safeGet(state, ['currentUserData', 'currentUser', 'role'], ROLE_USER);
      return ROLES_PERMISSIONS[role][permission];
    }
  });
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
