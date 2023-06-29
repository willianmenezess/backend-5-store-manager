const { insertProductSchema } = require('./schemas');

const validateInsertProduct = (keysObjectToValidate) => {
  const { error } = insertProductSchema.validate(keysObjectToValidate);
  if (error) {
    return { status: 'INVALID_VALUE', message: error.message };
  }
};
  module.exports = {
    validateInsertProduct,
  };