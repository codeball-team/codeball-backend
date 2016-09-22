import { model } from 'utils';

const PitchModel = model({
  getDefaultAttributes: () => ({
    address: undefined,
    id: undefined,
    maxNumberOfPlayers: 0,
    minNumberOfPlayers: 0,
    name: '',
    type: undefined,
    url: undefined
  }),

  fromServerFormat(serverResponse) {
    return new PitchModel({
      address: serverResponse.address,
      id: serverResponse.id,
      maxNumberOfPlayers: serverResponse.maxNumberOfPlayers,
      minNumberOfPlayers: serverResponse.minNumberOfPlayers,
      name: serverResponse.name,
      type: serverResponse.pitchType
    });
  }
});

export default PitchModel;
