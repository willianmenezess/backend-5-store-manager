const { expect } = require('chai');
const sinon = require('sinon');
const { validationsInput } = require('../../../src/middlewares');

describe('Realizando teste - SALES MIDDLEWARES:', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Propriedade "product" da venda não informado', async function () {
    const next = sinon.stub().returns();
    const req = { body: [
      {
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateInputSale1(req, res, next);
    expect(next.called).to.be.equal(true);
    await validationsInput.validateInputSale2(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
    });

  it('Propriedade "quantity" da venda não informado', async function () {
    const next = sinon.stub().returns();
    const req = { body: [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
        },
    ] };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateInputSale1(req, res, next);
    expect(next.called).to.be.equal(true);
    await validationsInput.validateInputSale2(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
    });

  it('Propriedade "quantity" da venda com valor menor que 1', async function () {
    const next = sinon.stub().returns();
    const req = { body: [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateInputSale1(req, res, next);
    expect(next.called).to.be.equal(true);
    await validationsInput.validateInputSale2(req, res, next);
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
    });

  it('propriedades da criação da venda passadas corretamente', async function () {
    const next = sinon.stub().returns();
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
    status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateInputSale1(req, res, next);
    expect(next.called).to.be.equal(true);
    await validationsInput.validateInputSale2(req, res, next);
    expect(next.called).to.be.equal(true);
  });

  it('Propriedade "quantity" não informado', async function () {
    const next = sinon.stub().returns();
    const req = { params: { saleId: 1, productId: 1 }, body: { } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateUpdateQuantity(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Propriedade "quantity" menor ou igual a zero', async function () {
    const next = sinon.stub().returns();
    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 0 } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateUpdateQuantity(req, res, next);
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Propriedades do update de venda passadas corretamente', async function () {
    const next = sinon.stub().returns();
    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 1 } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validateUpdateQuantity(req, res, next);
    expect(next.called).to.be.equal(true);
    expect(res.status.calledWith(422)).to.be.equal(false);
  });
}); 