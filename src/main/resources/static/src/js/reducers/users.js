const initialState = {
  1: {
    name: 'asdasd 1'
  },
  2: {
    name: 'asdasd 2'
  },
  3: {
    name: 'asdasd 3'
  },
  4: {
    name: 'asdasd 4'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
