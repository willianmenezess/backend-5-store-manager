const salesFromDB = [
    {
      saleId: 1,
      date: '2023-06-29T01:16:15.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 2,
      date: '2023-07-02T01:14:12.000Z',
      productId: 2,
      quantity: 10,
    },
];

const salesFromModel = [
    {
      saleId: 1,
      date: '2023-06-29T01:16:15.000Z',
      productId: 1,
      quantity: 5,
    },
    {
        saleId: 2,
        date: '2023-07-02T01:14:12.000Z',
        productId: 2,
        quantity: 10,
      },
];
  
  const saleByIdFromDB = [{
    saleId: 1,
    date: '2023-06-29T01:16:15.000Z',
    productId: 1,
    quantity: 5,
  }];

  const saleByIdFromModel = [{
    saleId: 1,
    date: '2023-06-29T01:16:15.000Z',
    productId: 1,
    quantity: 5,
  }];

  const salesFromServiceSuccessful = { status: 'SUCCESSFUL', data: salesFromModel };
  const saleByIdFromServiceSuccessful = { status: 'SUCCESSFUL', data: saleByIdFromModel };
  const saleByIdFromServiceNotFound = {
    status: 'NOT_FOUND',
    data: { message: 'Sale not found' },
  };

  const createSaleFromModel = {
    id: 10,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  };
  
  module.exports = {
    salesFromDB,
    salesFromModel,
    saleByIdFromDB,
    saleByIdFromModel,
    salesFromServiceSuccessful,
    saleByIdFromServiceSuccessful,
    saleByIdFromServiceNotFound,
    createSaleFromModel,
  };