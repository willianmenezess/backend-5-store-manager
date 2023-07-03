const { saleModel } = require('../models');

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
    const data = await saleModel.create(sale);
    return { status: 'CREATED', data };
  };

  module.exports = {
    getAll,
    findById,
    deleteSale,
    create,
  };