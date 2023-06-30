const route = require('express').Router();
const { saleController } = require('../controllers');
const { validationsInput } = require('../middlewares');

const { validationInputId } = validationsInput;

route.get('/', saleController.getAll);
route.get('/:id', saleController.findById);
route.delete('/:id', validationInputId, saleController.deleteSale);

module.exports = route;