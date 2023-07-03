const { saleModel } = require('../models');
const { productModel } = require('../models');
const { validateInputProduct } = require('./validationsInputValues');

const getAll = async () => {
    const data = await saleModel.getAll();
    return { status: 'SUCCESSFUL', data };
  };
  
  const findById = async (id) => {
    const data = await saleModel.findById(id);
    if (!data || data.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }
    return { status: 'SUCCESSFUL', data };
  };

  const deleteSale = async (id) => {
    const existId = await saleModel.findSaleById(id);
    if (!existId) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    await saleModel.deleteSale(id);
    return { status: 'DELETED' };
  };

  const create = async (sale) => {
    const allProducts = await productModel.getAll();
    const error = validateInputProduct(sale, allProducts);
    if (error) return { status: error.status, data: { message: error.message } };
    const data = await saleModel.create(sale);
    return { status: 'CREATED', data };
  };

  module.exports = {
    getAll,
    findById,
    deleteSale,
    create,
  };