import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DATA_INVALIDATION_TIME, ROLE_USER, ROLES_PERMISSIONS } from 'constants';
import { isDataInvalidated, safeGet } from 'utils';
import * as actions from 'actions';

export default function Container(ComponentClass, mapStateToProps) {
  return connect(
    enhancePropsWithHasPermissions(mapStateToProps),
    mapDispatchToProps
  )(ComponentClass);
}

function enhancePropsWithHasPermissions(mapStateToProps = () => ({})) {
  return state => ({
    ...mapStateToProps(state),

    hasPermission(permission) {
      const role = safeGet(state, ['currentUserData', 'currentUser', 'role'], ROLE_USER);
      return ROLES_PERMISSIONS[role][permission];
    },

    refreshDataIfNecessary(data, refreshDataCallback) {
      const { isLoading, lastUpdate } = data;

      if (!isLoading && isDataInvalidated(lastUpdate, DATA_INVALIDATION_TIME)) {
        refreshDataCallback();
      }
    }
  });
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
