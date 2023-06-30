const { expect } = require('chai');
const sinon = require('sinon');
const { validationsInput } = require('../../../src/middlewares');

describe('Realizando teste - PRODUCT MIDDLEWARES:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Input "name" não informado', async function () {
    const next = sinon.stub().returns();
    const req = { body: {} };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validationInputName(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });

  it('Input "id" não informado', async function () {
    const next = sinon.stub().returns();
    const req = { params: {} };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validationInputId(req, res, next);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.status().json.calledWith({ message: '"id" is required' })).to.be.equal(true);
  });

  it('Input "name" informado', async function () {
    const next = sinon.stub().returns();
    const req = { body: { name: 'Teste' } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validationInputName(req, res, next);
    expect(next.calledOnce).to.be.equal(true);
  });

  it('Input "id" informado', async function () {
    const next = sinon.stub().returns();
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returns({ json: sinon.stub().returns() }),
    };
    await validationsInput.validationInputId(req, res, next);
    expect(next.calledOnce).to.be.equal(true);
  });
});
