const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, 
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

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

const create = async (sale) => {
  const currentData = new Date();
  const query1 = 'INSERT INTO sales (date) VALUES (?)';
  const [saleCreated] = await connection.execute(query1, [currentData]);
  const currentSaleId = saleCreated.insertId;
  const arraySaleProducts = sale.map((product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query2 = `INSERT INTO sales_products (sale_id,
    ${columns}) VALUES (?,${placeholders})`;
  return connection.execute(query2, [currentSaleId, ...Object.values(product)]);
  });
  await Promise.all(arraySaleProducts);
  return { id: currentSaleId, itemsSold: sale };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const currentData = new Date();
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  await connection.execute(query, [quantity, saleId, productId]);
  return {
    date: currentData,
    productId,
    quantity,
    saleId,
  };
};
module.exports = {
  getAll,
  findById,
  deleteSale,
  findSaleById,
  create,
  updateQuantity,
};