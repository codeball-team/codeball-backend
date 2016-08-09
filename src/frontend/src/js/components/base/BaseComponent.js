import ConditionalRender from './ConditionalRender';
import shallowCompare from 'react-addons-shallow-compare';

export default function BaseComponent(ComponentClass) {
  const BaseComponentClass = ConditionalRender(ComponentClass);

  BaseComponentClass.prototype.shouldComponentUpdate = function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  };

  return BaseComponentClass;
}
