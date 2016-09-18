import ConditionalRender from './ConditionalRender';
import PureRenderComponent from './PureRenderComponent';

const baseDecorators = [
  PureRenderComponent,
  ConditionalRender
];

export default function BaseComponent(ComponentClass) {
  return ConditionalRender(PureRenderComponent(ComponentClass));
}
