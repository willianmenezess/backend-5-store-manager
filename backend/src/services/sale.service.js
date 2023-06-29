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
  
  module.exports = {
    getAll,
    findById,
  };