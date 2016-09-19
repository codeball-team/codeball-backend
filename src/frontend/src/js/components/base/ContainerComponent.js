import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { _, periodicCallback, safeGet } from 'utils';
import { AUTO_REFRESH_DELAY, ROLE_USER, ROLES_PERMISSIONS } from 'constants';
import * as actions from 'actions';
import { LoadableContent } from 'components/ui';
import PureRenderComponent from './PureRenderComponent';

export default function ContainerComponent(ComponentClass, options) {
  const {
    doesNotNeedUpdatingData,
    mapStateToProps,
    periodicUpdateData,
    updateData
  } = handleOptions(options);

  class Container extends Component {
    static propTypes = {
      isLoading: doesNotNeedUpdatingData ? PropTypes.bool : PropTypes.bool.isRequired
    };

    static defaultProps = {
      isLoading: false
    };

    componentWillMount = () => {
      periodicUpdateData.start(this.updateDataCallback(this.props));
    };

    componentWillReceiveProps = newProps => {
      const idPath = ['params', 'id'];
      if(safeGet(newProps, idPath) !== safeGet(this.props, idPath)) {
        periodicUpdateData.restart(this.updateDataCallback(newProps));
      }
    };

    componentWillUnmount = () => {
      periodicUpdateData.end();
    };

    updateDataCallback = props => () => updateData(props);

    render() {
      const { isLoading, ...childProps } = this.props;

      return (
        <LoadableContent
          ComponentClass={ComponentClass}
          childProps={childProps}
          isLoading={isLoading} />
      );
    }
  }

  return connect(
    enhanceProps(mapStateToProps),
    mapDispatchToProps
  )(PureRenderComponent(Container));
}

function handleOptions(options = {}) {
  const {
    mapStateToProps = () => ({}),
    periodicDataUpdates = false,
    updateData = _.noop
  } = options;

  return {
    doesNotNeedUpdatingData: updateData === _.noop,
    mapStateToProps,
    periodicUpdateData: applyPeriodicUpdates(periodicDataUpdates),
    updateData
  };
}

function applyPeriodicUpdates(periodicDataUpdates) {
  if(periodicDataUpdates) {
    return periodicCallback(AUTO_REFRESH_DELAY);
  }

  return periodicCallback();
}

function enhanceProps(mapStateToProps) {
  return state => ({
    state,
    ...mapStateToProps(state),
    getPermission: permission => getPermission(state, permission),
    hasPermission: permission => hasPermission(state, permission)
  });
}

function getPermission(state, permission) {
  const role = safeGet(state, ['currentUserData', 'currentUser', 'role'], ROLE_USER);
  return ROLES_PERMISSIONS[role][permission];
}

function hasPermission(state, permission) {
  return Boolean(getPermission(state, permission));
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
