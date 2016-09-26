import { _ } from 'utils';

export default function model(options) {
  const {
    getDefaultAttributes,
    fromServerFormat = _.noop,
    validators = {},
    ...otherStatic
  } = options;
  const validatorsNames = Object.keys(validators);

  class Model {
    static getDefaultAttributes = getDefaultAttributes;

    static isValid = modelInstance => validatorsNames.every(
      validatorName => Boolean(Model[validatorName](modelInstance))
    );

    static fromServerFormat = wrapFromServerFormat(Model, fromServerFormat);

    constructor(attributes) {
      Object.assign(
        this,
        _({ ...attributes }).defaults(getDefaultAttributes())
      );
    }
  }

  return Object.assign(Model, {
    ...validators,
    ...otherStatic
  });
}

function wrapFromServerFormat(Model, fromServerFormat) {
  const defaultEmptyArrays = createDefaultEmptyArrays(Model.getDefaultAttributes);

  return serverResponse => {
    if(!serverResponse) {
      return new Model();
    }

    _.defaults(serverResponse, defaultEmptyArrays);

    return fromServerFormat(serverResponse);
  };
}

function createDefaultEmptyArrays(getDefaultAttributes) {
  const defaultObject = getDefaultAttributes();
  const defaultObjectKeys = Object.keys(defaultObject);
  const arrayAttributes = defaultObjectKeys.filter(key => Array.isArray(defaultObject[key]));
  return arrayAttributes.reduce((defaultArrays, key) => ({
    ...defaultArrays,
    [key]: defaultObject[key]
  }), {});
}
