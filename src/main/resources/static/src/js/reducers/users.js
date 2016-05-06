const initialState = {
  1: {
    id: 1,
    name: 'asdasd 1'
  },
  2: {
    id: 2,
    name: 'asdasd 2'
  },
  3: {
    id: 3,
    name: 'asdasd 3'
  },
  4: {
    id: 4,
    name: 'asdasd 4'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
