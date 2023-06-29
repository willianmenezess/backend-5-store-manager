const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/', productController.getAll);
route.get('/:id', productController.findById);
route.post('/', productController.insert);

module.exports = route;