const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { salesFromServiceSuccessful,
saleByIdFromServiceSuccessful, saleByIdFromServiceNotFound,
createSaleFromModel } = require('../mocks/sale.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando teste - SALE CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(saleService, 'getAll').resolves(salesFromServiceSuccessful);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromServiceSuccessful.data);
  });

  it('recuperando uma venda por id com sucesso', async function () {
    sinon.stub(saleService, 'findById').resolves(saleByIdFromServiceSuccessful);
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleByIdFromServiceSuccessful.data);
  });

  it('recuperando uma venda por id com falha', async function () {
    sinon.stub(saleService, 'findById').resolves(saleByIdFromServiceNotFound);
    const req = { params: { id: 99999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleByIdFromServiceNotFound.data);
  });

  it('deletando uma venda com sucesso', async function () {
    sinon.stub(saleService, 'deleteSale').resolves({ status: 'DELETED' });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('criando uma venda com sucesso', async function () {
    sinon.stub(saleService, 'create').resolves({ status: 'CREATED', data: createSaleFromModel });
    const req = { body: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.create(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createSaleFromModel);
  });
});