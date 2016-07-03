import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';

export default function bindActionsAndConnect(component, mapStateToProps) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
