export default function reducer(initialState, handlers = {}) {
  return (state = initialState, action) => {
    const { type } = action;
    const handler = handlers[type];

    if(handler) {
      return handler(state, action);
    }

    return state;
  };
}
