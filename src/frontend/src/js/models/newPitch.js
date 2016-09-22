import { model } from 'utils';
import { isInteger, isNotEmptyString } from 'utils/validation';

const NewPitchModel = model({
  getDefaultAttributes: () => ({
    address: undefined,
    minNumberOfPlayers: 6,
    maxNumberOfPlayers: 10,
    name: undefined,
    type: undefined
  }),

  validators: {
    isAddressValid({ address }) {
      return isNotEmptyString(address);
    },

    isCapacityValid({ minNumberOfPlayers, maxNumberOfPlayers }) {
      return [
        this.isMinNumberOfPlayersValid({ minNumberOfPlayers }),
        this.isMaxNumberOfPlayersValid({ maxNumberOfPlayers }),
        minNumberOfPlayers <= maxNumberOfPlayers
      ].every(Boolean);
    },

    isMinNumberOfPlayersValid({ minNumberOfPlayers }) {
      return isInteger(minNumberOfPlayers) && minNumberOfPlayers >= 2;
    },

    isMaxNumberOfPlayersValid({ maxNumberOfPlayers }) {
      return isInteger(maxNumberOfPlayers) && maxNumberOfPlayers <= 22;
    },

    isNameValid({ name }) {
      return isNotEmptyString(name);
    },

    isTypeValid({ type }) {
      return isNotEmptyString(type);
    }
  },

  toServerFormat(newPitchModel) {
    const { address, minNumberOfPlayers, maxNumberOfPlayers, name, type } = newPitchModel;

    return {
      address,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      name,
      pitchType: type
    };
  }
});

export default NewPitchModel;
