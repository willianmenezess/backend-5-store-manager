const { productModel } = require('../models');

const getAll = async () => {
  const data = await productModel.getAll();
  return { status: 'SUCCESSFUL', data };
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAll,
  findById,
};