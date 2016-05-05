import { expect } from '../testHelper';
import { SAY_HELLO } from 'constants/ActionTypes';
import { sayHello } from 'actions/CodeballActions';

describe('Actions', () => {
  describe('sayHello', () => {
    it('has the correct type', () => {
      const action = sayHello();
      expect(action.type).to.equal(SAY_HELLO);
    });
  });
});
