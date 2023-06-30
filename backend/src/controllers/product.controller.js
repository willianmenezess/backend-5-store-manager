const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, data } = await productService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const { status, data } = await productService.insert(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.update(Number(id), req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
};