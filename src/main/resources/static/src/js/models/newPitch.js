import _ from 'underscore';

export default class NewPitchModel {
  constructor(attributes) {
    _.extend(this, _({ ...attributes }).defaults({
      address: undefined,
      minNumberOfPlayers: 6,
      maxNumberOfPlayers: 10,
      name: undefined
    }));
  }

  static isValid(newPitchModel) {
    const { address, minNumberOfPlayers, maxNumberOfPlayers, name } = newPitchModel;
    const isCapacityValid = [minNumberOfPlayers, maxNumberOfPlayers].every(Number.isInteger);
    return isCapacityValid && [address, name].every(Boolean);
  }

  static toServerFormat(newPitchModel) {
    const { address, minNumberOfPlayers, maxNumberOfPlayers, name } = newPitchModel;

    return {
      address,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      name
    };
  }
}
