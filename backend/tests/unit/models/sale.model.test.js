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

  it('deletando uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const inputData = 1;
    const sale = await saleModel.deleteSale(inputData);
    expect(sale).to.be.deep.equal(undefined);
  });

  it('recuperando uma venda por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      date: '2023-06-29T01:16:15.000Z',
    }]]);
    const inputData = 1;
    const sale = await saleModel.findSaleById(inputData);
    expect(sale).to.be.deep.equal({
      id: 1,
      date: '2023-06-29T01:16:15.000Z',
    });
  });

  it('criando uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute').onFirstCall().resolves([{ insertId: 10 }]).onSecondCall()
    .resolves([{ affectedRows: 1 }]);
    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const sale = await saleModel.create(inputData);
    expect(sale).to.be.deep.equal({
      id: 10,
      itemsSold: inputData,
    });
  });

  it('atualizando a quantidade de um produto em uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const inputData = [1, 1, 5];
    const sale = await saleModel.updateQuantity(...inputData);
    expect(sale).to.have.property('productId');
    expect(sale).to.have.property('saleId');
    expect(sale).to.have.property('quantity');
  });
});
