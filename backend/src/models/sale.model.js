const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT 
  sp.sale_id,
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products AS sp
  INNER JOIN sales AS s ON s.id = sp.sale_id;`;

  const [sales] = await connection.execute(query);
  return camelize(sales);
};

const findById = async (id) => {
  const query = `SELECT 
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products AS sp
  INNER JOIN sales AS s ON s.id = sp.sale_id
  WHERE sale_id = ?;`;
  const [sale] = await connection.execute(query, [id]);
  return camelize(sale);
};

const findSaleById = async (id) => {
  const query = 'SELECT * FROM sales WHERE id = ? AND id IS NOT NULL;';
  const [[sale]] = await connection.execute(query, [id]);
  return camelize(sale);
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  findById,
  deleteSale,
  findSaleById,
};