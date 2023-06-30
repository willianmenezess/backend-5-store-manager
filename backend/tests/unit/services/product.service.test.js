const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productsFromModel, productsFromServiceSuccessful, productByIdFromModel, 
  productByIdFromServiceSuccessful, productInsertFromModel, productUpdateFromModel } = require('../mocks/product.mock');

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
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);
    const inputData = 1;
    const responseService = await productService.findById(inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(productByIdFromServiceSuccessful.data);
  });

  it('recuperando um produto por id com falha', async function () {
    sinon.stub(productModel, 'findById').resolves(null);
    const inputData = 99999;
    const responseService = await productService.findById(inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('inserindo um produto com sucesso', async function () {
    sinon.stub(productModel, 'insert').resolves(productInsertFromModel);
    const inputData = {
      name: 'Produto Teste',
    };
    const responseService = await productService.insert(inputData);
    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.deep.equal(productInsertFromModel);
  });

  it('inserindo um produto com falha - "name" com menos de 5 caracteres', async function () {
    const inputData = {
      name: 'Prod',
    };
    const responseService = await productService.insert(inputData);
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
  
  it('atualizando um produto com sucesso', async function () {
    sinon.stub(productModel, 'update').resolves(productUpdateFromModel);
    sinon.stub(productModel, 'findById').resolves(productInsertFromModel);
    const inputData = {
      name: 'Produto Teste2',
    };
    const responseService = await productService.update(5, inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(productUpdateFromModel);
  });

  it('atualizando um produto com falha - produto não encontrado', async function () {
    sinon.stub(productModel, 'findById').resolves(null);
    const inputData = {
      name: 'Produto Teste2',
    };
    const responseService = await productService.update(99999, inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('atualizando um produto com falha - "name" com menos de 5 caracteres', async function () {
    sinon.stub(productModel, 'findById').resolves(productInsertFromModel);
    const inputData = {
      name: 'Prod',
    };
    const responseService = await productService.update(5, inputData);
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('deletando um produto com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productInsertFromModel);
    sinon.stub(productModel, 'deleteProduct').resolves(true);
    const responseService = await productService.deleteProduct(5);
    expect(responseService.status).to.be.equal('DELETED');
  });

  it('deletando um produto com falha - produto não encontrado', async function () {
    sinon.stub(productModel, 'findById').resolves(null);
    const inputData = 99999;
    const responseService = await productService.deleteProduct(inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });
});
