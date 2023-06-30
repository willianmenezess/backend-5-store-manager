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

// const idExist = async (id) => {
//   const existId = await productModel.findById(id);
//   if (!existId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
// };

const update = async (id, productData) => {
  const existId = await productModel.findById(id);
  if (!existId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  const error = validations.validateInsertProduct(productData);
  if (error) return { status: error.status, data: { message: error.message } };
  const data = await productModel.update(id, productData);
  return { status: 'SUCCESSFUL', data }; 
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
};