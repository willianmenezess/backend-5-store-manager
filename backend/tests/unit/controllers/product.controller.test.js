const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { productsFromServiceSuccessful,
productByIdFromServiceSuccessful, productByIdFromServiceNotFound } = require('../mocks/product.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando teste - PRODUCT CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando todos os produtos com sucesso', async function () {
    sinon.stub(productService, 'getAll').resolves(productsFromServiceSuccessful);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromServiceSuccessful.data);
  });

  it('recuperando um produto por id com sucesso', async function () {
    sinon.stub(productService, 'findById').resolves(productByIdFromServiceSuccessful);
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productByIdFromServiceSuccessful.data);
  });

  it('recuperando um produto por id com falha', async function () {
    sinon.stub(productService, 'findById').resolves(productByIdFromServiceNotFound);
    const req = { params: { id: 99999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});