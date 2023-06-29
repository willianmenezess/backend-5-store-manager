const express = require('express');
const { productRoute, saleRoute } = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRoute);
app.use('/sales', saleRoute);

module.exports = app;
