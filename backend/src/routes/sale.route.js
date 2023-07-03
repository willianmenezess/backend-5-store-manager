const route = require('express').Router();
const { saleController } = require('../controllers');
const { validationsInput } = require('../middlewares');

const { validationInputId, validateInputSale1, validateInputSale2 } = validationsInput;

route.get('/', saleController.getAll);
route.get('/:id', saleController.findById);
route.delete('/:id', validationInputId, saleController.deleteSale);
route.post('/', validateInputSale1, validateInputSale2, saleController.create);

module.exports = route;