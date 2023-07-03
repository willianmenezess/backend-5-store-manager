const { insertProductSchema } = require('./schemas');

const validateInsertProduct = (keysObjectToValidate) => {
  const { error } = insertProductSchema.validate(keysObjectToValidate);
  if (error) {
    return { status: 'INVALID_VALUE', message: error.message };
  }
};

const validateInputProduct = (sale, allProducts) => {
  const allProductsIds = allProducts.map((item) => item.id);
  let isProductExist = true;
  sale.forEach((item) => {
    if (!allProductsIds.includes(item.productId)) {
      isProductExist = false;
    }
  });
  if (!isProductExist) {
    return { status: 'NOT_FOUND', message: 'Product not found' };
  }
  return false;
};
 
  module.exports = {
    validateInsertProduct,
    validateInputProduct,
  };