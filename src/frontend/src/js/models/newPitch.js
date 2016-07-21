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

  static isAddressValid(address) {
    return typeof address === 'string' && address.length > 0;
  }

  static isCapacityValid(minNumberOfPlayers, maxNumberOfPlayers) {
    return [
      NewPitchModel.isMinNumberOfPlayersValid(minNumberOfPlayers),
      NewPitchModel.isMaxNumberOfPlayersValid(maxNumberOfPlayers),
      minNumberOfPlayers <= maxNumberOfPlayers
    ].every(Boolean);
  }

  static isMinNumberOfPlayersValid(minNumberOfPlayers) {
    return Number.isInteger(minNumberOfPlayers) && minNumberOfPlayers >= 2;
  }

  static isMaxNumberOfPlayersValid(maxNumberOfPlayers) {
    return Number.isInteger(maxNumberOfPlayers) && maxNumberOfPlayers <= 22;
  }

  static isNameValid(name) {
    return typeof name === 'string' && name.length > 0;
  }

  static isValid(newPitchModel) {
    const { address, minNumberOfPlayers, maxNumberOfPlayers, name } = newPitchModel;

    return [
      NewPitchModel.isAddressValid(address),
      NewPitchModel.isCapacityValid(minNumberOfPlayers, maxNumberOfPlayers),
      NewPitchModel.isNameValid(name)
    ].every(Boolean);
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
