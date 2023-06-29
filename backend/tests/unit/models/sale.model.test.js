const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sale.model');
const { salesFromDB, salesFromModel, saleByIdFromDB, saleByIdFromModel } = require('../mocks/sale.mock');

describe('Realizando teste - SALE MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const sales = await saleModel.getAll();
    expect(sales).to.be.an('array');
    expect(sales[0]).to.be.an('object');
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('recuperando venda por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdFromDB]);
    const inputData = 1;
    const sale = await saleModel.findById(inputData);
    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleByIdFromModel);
  });

  it('recuperando uma venda por id com falha', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const inputData = 9999;
    const sale = await saleModel.findById(inputData);
    expect(sale).to.be.deep.equal([]);
  });
});