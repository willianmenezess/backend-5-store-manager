const { productModel } = require('../models');
const validations = require('./validationsInputValues');

const getAll = async () => {
  const data = await productModel.getAll();
  return { status: 'SUCCESSFUL', data };
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data };
};

const insert = async (productData) => {
  const error = validations.validateInsertProduct(productData);
  if (error) return { status: error.status, data: { message: error.message } };
  const data = await productModel.insert(productData);
  return { status: 'CREATED', data };
};

module.exports = {
  getAll,
  findById,
  insert,
};