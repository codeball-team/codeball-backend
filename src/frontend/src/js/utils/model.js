import { _ } from 'utils';

export default function model({ defaultAttributes, validators = {}, ...otherStatic }) {
  const validatorsNames = Object.keys(validators);

  class Model {
    constructor(attributes) {
      _.extend(this, _({ ...attributes }).defaults(defaultAttributes()));
    }
  }

  _(validators).each((validator, name) => {
    Model[name] = validator.bind(Model);
  });

  _.extend(Model, otherStatic);

  Model.isValid = modelInstance => validatorsNames.every(
    validatorName => Boolean(Model[validatorName](modelInstance))
  );

  return Model;
}
