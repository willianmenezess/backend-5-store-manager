const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const { productsFromDB, productsFromModel, productByIdFromDB, productByIdFromModel } = require('../mocks/product.mock');

describe('Realizando teste - PRODUCT MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const products = await productModel.getAll();
    expect(products).to.be.an('array');
    expect(products[0]).to.be.an('object');
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('recuperando um produto por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productByIdFromDB]]);
    const inputData = 1;
    const product = await productModel.findById(inputData);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productByIdFromModel);
  });

  it('recuperando um produto por id com falha', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const inputData = 9999;
    const product = await productModel.findById(inputData);
    expect(product).to.be.an('undefined');
  });

  it('inserindo um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    const inputData = {
      name: 'Produto Teste',
    };
    const responseData = { id: 5, ...inputData };
    const product = await productModel.insert(inputData);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(responseData);
  });
});
