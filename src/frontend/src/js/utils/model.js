import { _ } from 'utils';

export default function model(options) {
  const {
    defaultAttributes,
    fromServerFormat = _.noop,
    validators = {},
    ...otherStatic
  } = options;
  const validatorsNames = Object.keys(validators);

  class Model {
    constructor(attributes) {
      Object.assign(
        this,
        _({ ...attributes }).defaults(defaultAttributes())
      );
    }
  }

  _(validators).each((validator, name) => {
    Model[name] = validator.bind(Model);
  });

  Object.assign(Model, {
    ...otherStatic,
    fromServerFormat: wrapFromServerFormat(Model, defaultAttributes, fromServerFormat)
  });

  Model.isValid = modelInstance => validatorsNames.every(
    validatorName => Boolean(Model[validatorName](modelInstance))
  );

  return Model;
}

function wrapFromServerFormat(Model, defaultAttributes, fromServerFormat) {
  const defaultEmptyArrays = createDefaultEmptyArrays(defaultAttributes);

  return serverResponse => {
    if(!serverResponse) {
      return new Model();
    }

    _.defaults(serverResponse, defaultEmptyArrays);

    return fromServerFormat(serverResponse);
  };
}

function createDefaultEmptyArrays(defaultAttributes) {
  const defaultObject = defaultAttributes();
  const defaultObjectKeys = Object.keys(defaultObject);
  const arrayKeys = defaultObjectKeys.filter(key => Array.isArray(defaultObject[key]));
  return arrayKeys.reduce((defaultArrays, key) => ({
    ...defaultArrays,
    [key]: defaultObject[key]
  }), {});
}
