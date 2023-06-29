const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { salesFromServiceSuccessful,
saleByIdFromServiceSuccessful, saleByIdFromServiceNotFound } = require('../mocks/sale.mock');

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
});