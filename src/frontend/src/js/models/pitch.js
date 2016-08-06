import { _ } from 'utils';

export default class PitchModel {
  constructor(attributes = {}) {
    _.extend(this, _({ ...attributes }).defaults({
      id: undefined,
      name: '',
      type: undefined,
      address: undefined,
      url: undefined,
      minNumberOfPlayers: 0,
      maxNumberOfPlayers: 0
    }));
  }

  static fromServerFormat(serverResponse) {
    if (!serverResponse) {
      return new PitchModel();
    }

    return new PitchModel({
      id: serverResponse.id,
      name: serverResponse.name,
      type: serverResponse.pitchType,
      address: serverResponse.address,
      minNumberOfPlayers: serverResponse.minNumberOfPlayers,
      maxNumberOfPlayers: serverResponse.maxNumberOfPlayers
    });
  }

  static example() {
    return new PitchModel({
      id: 1,
      name: 'Boisko - ul. Św. Filipa',
      type: 'Hard Ground',
      address: 'ul. Św. Filipa 15, Kraków',
      url: 'https://www.facebook.com/Boisko-ul-%C5%9Aw-Filipa-1429435503967371/',
      minNumberOfPlayers: 8,
      maxNumberOfPlayers: 12
    });
  }
}
