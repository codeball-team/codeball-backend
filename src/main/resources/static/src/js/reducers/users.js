const initialState = {
  1: {
    id: 1,
    name: 'Kazimierz Wielki'
  },
  2: {
    id: 2,
    name: 'Mieszko I'
  },
  3: {
    id: 3,
    name: 'Władysław Jagiełło'
  },
  4: {
    id: 4,
    name: 'Bolesław Chrobry'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
