import { renderComponent, expect } from '../testHelper';
import Codeball from '../../../src/js/containers/Codeball/Codeball';

describe('Codeball', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Codeball);
  });

  it('shows a div', () => {
    expect(component.find('div')).to.exist;
  });
});
