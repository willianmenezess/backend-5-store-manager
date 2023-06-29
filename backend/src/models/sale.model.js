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

module.exports = {
  getAll,
  findById,
};