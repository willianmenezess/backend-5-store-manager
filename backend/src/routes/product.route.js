const route = require('express').Router();
const { productController } = require('../controllers');
const { validationsInput } = require('../middlewares');

const { validationInputName, validationInputId } = validationsInput;

route.get('/', productController.getAll);
route.get('/:id', productController.findById);
route.post('/', validationInputName, productController.insert);
route.put('/:id', validationInputId, validationInputName, productController.update);
route.delete('/:id', validationInputId, productController.deleteProduct);

module.exports = route;