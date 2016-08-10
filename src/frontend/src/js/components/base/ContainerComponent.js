import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DATA_INVALIDATION_TIME, ROLE_USER, ROLES_PERMISSIONS } from 'constants';
import { isDataInvalidated, safeGet } from 'utils';
import * as actions from 'actions';

export default function ContainerComponent(ComponentClass, mapStateToProps) {
  return connect(
    enhanceProps(mapStateToProps),
    mapDispatchToProps
  )(ComponentClass);
}

function enhanceProps(mapStateToProps = () => ({})) {
  return state => ({
    ...mapStateToProps(state),
    hasPermission: permission => hasPermission(state, permission),
    refreshDataIfNecessary
  });
}

function hasPermission(state, permission) {
  const role = safeGet(state, ['currentUserData', 'currentUser', 'role'], ROLE_USER);
  return ROLES_PERMISSIONS[role][permission];
}

function refreshDataIfNecessary(data, refreshDataCallback) {
  const { isLoading, lastUpdate } = data;

  if (!isLoading && isDataInvalidated(lastUpdate, DATA_INVALIDATION_TIME)) {
    refreshDataCallback();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
