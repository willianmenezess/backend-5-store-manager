const route = require('express').Router();
const { saleController } = require('../controllers');
const { validationsInput } = require('../middlewares');

const { validationInputId, validateInputSale1, validateInputSale2,
    validateUpdateQuantity } = validationsInput;

route.get('/', saleController.getAll);
route.get('/:id', saleController.findById);
route.delete('/:id', validationInputId, saleController.deleteSale);
route.post('/', validateInputSale1, validateInputSale2, saleController.create);
const validations = [validateUpdateQuantity];
route.put('/:saleId/products/:productId/quantity', validations, saleController.updateQuantity);

module.exports = route;