import shallowCompare from 'react-addons-shallow-compare';

export default function PureRenderComponent(ComponentClass) {
  ComponentClass.prototype.shouldComponentUpdate = function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  };

  return ComponentClass;
}
