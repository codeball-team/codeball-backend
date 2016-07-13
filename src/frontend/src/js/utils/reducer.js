import _ from 'underscore';

export default function reducer(initialState, handlers = {}) {
  return (state = initialState, action) => {
    const { type } = action;

    if (_(handlers).has(type)) {
      const handler = handlers[type];
      return handler(state, action);
    }

    return state;
  };
}
