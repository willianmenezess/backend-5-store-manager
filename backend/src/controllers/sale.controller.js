const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, data } = await saleService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.deleteSale(Number(id));
  return res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  const { status, data } = await saleService.create(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const NumQuantity = Number(quantity);
  const NumSaleId = Number(saleId);
  const NumProdId = Number(productId);
  const { status, data } = await saleService.updateQuantity(NumSaleId, NumProdId, NumQuantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  findById,
  deleteSale,
  create,
  updateQuantity,
};