import ConditionalRender from './ConditionalRender';
import PureRenderComponent from './PureRenderComponent';

export default function BaseComponent(ComponentClass) {
  return ConditionalRender(PureRenderComponent(ComponentClass));
}
