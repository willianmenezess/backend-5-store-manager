const connection = require('./connection');
const { getFormattedColumnNames, 
  getFormattedPlaceholders, 
  getFormattedUpdateColumns } = require('../utils/generateFormattedQuery');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const insert = async (productData) => {
  const columns = getFormattedColumnNames(productData);
  const placeholders = getFormattedPlaceholders(productData);
  const query = `INSERT INTO products (${columns}) VALUES (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, Object.values(productData));
  return { id: insertId, ...productData };
};

const update = async (id, productData) => {
  const columns = getFormattedUpdateColumns(productData);
  const query = `UPDATE products SET ${columns} WHERE id = ?`;
  await connection.execute(query, [...Object.values(productData), id]);
  return { id, ...productData };
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
};