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

const update = async (id, productData) => {
  const existId = await productModel.findById(id);
  if (!existId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  const error = validations.validateInsertProduct(productData);
  if (error) return { status: error.status, data: { message: error.message } };
  const data = await productModel.update(id, productData);
  return { status: 'SUCCESSFUL', data }; 
};

const deleteProduct = async (id) => {
  const existId = await productModel.findById(id);
  if (!existId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productModel.deleteProduct(id);
  return { status: 'DELETED' };
};

const searchProductsFiltered = async (searchTerm) => {
  const allProducts = await productModel.getAll();
  const validateTerm = validations.validateSearchTerm(searchTerm);
  if (validateTerm) return { status: validateTerm.status, data: allProducts };
  const filteredProducts = allProducts.filter((product) => product.name.includes(searchTerm));
  return { status: 'SUCCESSFUL', data: filteredProducts };
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
  deleteProduct,
  searchProductsFiltered,
};