const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productByIdFromDB = { id: 1, name: 'Martelo de Thor' };
const productByIdFromModel = { id: 1, name: 'Martelo de Thor' };
const productsFromServiceSuccessful = { status: 'SUCCESSFUL', data: productsFromModel };
const productByIdFromServiceSuccessful = { status: 'SUCCESSFUL', data: productByIdFromModel };
const productByIdFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productInsertFromModel = { id: 5, name: 'Produto Teste' };
const productUpdateFromModel = { id: 5, name: 'Produto Teste2' };

module.exports = {
  productsFromDB,
  productsFromModel,
  productByIdFromDB,
  productByIdFromModel,
  productsFromServiceSuccessful,
  productByIdFromServiceSuccessful,
  productByIdFromServiceNotFound,
  productInsertFromModel,
  productUpdateFromModel,
};