import ConditionalRender from './ConditionalRender';

export default function BaseComponent(ComponentClass) {
  return ConditionalRender(ComponentClass);
}
