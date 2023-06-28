const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productsFromModel, productsFromServiceSuccessful, productByIdFromModel, 
  productByIdFromServiceSuccessful } = require('../mocks/product.mock');

describe('Realizando teste - PRODUCT SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'getAll').resolves(productsFromModel);
    const responseService = await productService.getAll();
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(productsFromServiceSuccessful.data);
  });

  it('recuperando um produto por id com sucesso', async function () {
    // Escreva seu teste aqui
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);
    const inputData = 1;
    const responseService = await productService.findById(inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(productByIdFromServiceSuccessful.data);
  });

  it('recuperando um produto por id com falha', async function () {
    // Escreva seu teste aqui
    sinon.stub(productModel, 'findById').resolves(null);
    const inputData = 99999;
    const responseService = await productService.findById(inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });
});
