import { model } from 'utils';

const PitchModel = model({
  defaultAttributes: () => ({
    id: undefined,
    name: '',
    type: undefined,
    address: undefined,
    url: undefined,
    minNumberOfPlayers: 0,
    maxNumberOfPlayers: 0
  }),

  fromServerFormat(serverResponse) {
    return new PitchModel({
      id: serverResponse.id,
      name: serverResponse.name,
      type: serverResponse.pitchType,
      address: serverResponse.address,
      minNumberOfPlayers: serverResponse.minNumberOfPlayers,
      maxNumberOfPlayers: serverResponse.maxNumberOfPlayers
    });
  }
});

export default PitchModel;
