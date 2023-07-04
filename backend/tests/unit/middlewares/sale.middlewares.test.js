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
    });
  });  