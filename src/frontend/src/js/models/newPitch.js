import { model } from 'utils';

const NewPitchModel = model({
  defaultAttributes: () => ({
    address: undefined,
    minNumberOfPlayers: 6,
    maxNumberOfPlayers: 10,
    name: undefined,
    type: undefined
  }),
  validators: {
    isAddressValid({ address }) {
      return typeof address === 'string' && address.length > 0;
    },

    isCapacityValid({ minNumberOfPlayers, maxNumberOfPlayers }) {
      return [
        this.isMinNumberOfPlayersValid({ minNumberOfPlayers }),
        this.isMaxNumberOfPlayersValid({ maxNumberOfPlayers }),
        minNumberOfPlayers <= maxNumberOfPlayers
      ].every(Boolean);
    },

    isMinNumberOfPlayersValid({ minNumberOfPlayers }) {
      return Number.isInteger(minNumberOfPlayers) && minNumberOfPlayers >= 2;
    },

    isMaxNumberOfPlayersValid({ maxNumberOfPlayers }) {
      return Number.isInteger(maxNumberOfPlayers) && maxNumberOfPlayers <= 22;
    },

    isNameValid({ name }) {
      return typeof name === 'string' && name.length > 0;
    },

    isTypeValid({ type }) {
      return typeof type === 'string' && type.length > 0;
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
