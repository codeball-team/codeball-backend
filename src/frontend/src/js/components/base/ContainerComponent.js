import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { _, safeGet } from 'utils';
import { ROLE_USER, ROLES_PERMISSIONS } from 'constants';
import * as actions from 'actions';
import { LoadableContent } from 'components/ui';
import PureRenderComponent from './PureRenderComponent';

export default function ContainerComponent(ComponentClass, options = {}) {
  const {
    mapStateToProps = () => ({}),
    updateData = _.noop
  } = options;
  const doesNotNeedUpdatingData = updateData === _.noop;

  class Container extends Component {
    static propTypes = {
      isLoading: doesNotNeedUpdatingData ? PropTypes.bool : PropTypes.bool.isRequired
    };

    static defaultProps = {
      isLoading: false
    };

    componentWillMount = () => {
      updateData(this.props);
    };

    componentWillReceiveProps = newProps => {
      const idPath = ['params', 'id'];
      if (safeGet(newProps, idPath) !== safeGet(this.props, idPath)) {
        updateData(newProps);
      }
    };

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
