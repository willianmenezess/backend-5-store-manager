const route = require('express').Router();
const { productController } = require('../controllers');
const { validationsInput } = require('../middlewares');

route.get('/', productController.getAll);
route.get('/:id', productController.findById);
route.post('/', validationsInput.validationInputName, productController.insert);

module.exports = route;