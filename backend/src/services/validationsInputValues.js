const { insertProductSchema } = require('./schemas');
const { saleModel } = require('../models');

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

const validateInputProductId = (productId, allProducts) => {
  const allProductsIds = allProducts.map((item) => item.id);
  if (!allProductsIds.includes(productId)) {
    return { status: 'NOT_FOUND', message: 'Product not found in sale' };
  }
  return false;
};

const validateSaleId = async (saleId) => {
  const saleExists = await saleModel.findSaleById(saleId);
  if (!saleExists) {
    return { status: 'NOT_FOUND', message: 'Sale not found' };
  }
  return false;
};
 
const validateSearchTerm = (searchTerm) => {
  if (searchTerm === '') {
    return { status: 'SUCCESSFUL' };
  }
};

  module.exports = {
    validateInsertProduct,
    validateInputProduct,
    validateInputProductId,
    validateSaleId,
    validateSearchTerm,
  };