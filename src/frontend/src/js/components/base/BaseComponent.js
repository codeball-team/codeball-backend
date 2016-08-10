import ConditionalRender from './ConditionalRender';
import PureRenderComponent from './PureRenderComponent';

const baseDecorators = [
  ConditionalRender,
  PureRenderComponent
];

export default function BaseComponent(ComponentClass) {
  return baseDecorators.reduce(
    (BaseComponentClass, decorator) => decorator(BaseComponentClass),
    ComponentClass
  );
}
