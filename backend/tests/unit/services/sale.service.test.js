const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { salesFromModel, salesFromServiceSuccessful, saleByIdFromModel, 
  saleByIdFromServiceSuccessful, saleByIdFromServiceNotFound } = require('../mocks/sale.mock');

describe('Realizando teste - SALE SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(saleModel, 'getAll').resolves(salesFromModel);
    const responseService = await saleService.getAll();
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(salesFromServiceSuccessful.data);
  });

  it('recuperando venda por id com sucesso', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleByIdFromModel);
    const inputData = 1;
    const responseService = await saleService.findById(inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(saleByIdFromServiceSuccessful.data);
  });

  it('recuperando um produto por id com falha', async function () {
    // Escreva seu teste aqui
    sinon.stub(saleModel, 'findById').resolves([]);
    const inputData = 99999;
    const responseService = await saleService.findById(inputData);
    expect(responseService.status).to.be.equal(saleByIdFromServiceNotFound.status);
    expect(responseService.data).to.be.deep.equal(saleByIdFromServiceNotFound.data);
  });
});
