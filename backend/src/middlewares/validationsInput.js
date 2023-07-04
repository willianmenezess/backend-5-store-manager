const validationInputName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const validationInputId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: '"id" is required' });
  }
  next();
};

const validateInputSale1 = (req, _res, next) => {
  const sale = req.body;
  const handleExists = { productExist: true, quantityExist: true, quantityIsZero: false };
  sale.forEach((item) => {
    if (!item.productId) {
      handleExists.productExist = false;
    }
    if (item.quantity === undefined) {
      handleExists.quantityExist = false;
    }
    if (Number(item.quantity) <= 0) {
      handleExists.quantityIsZero = true;
    }
  });
  req.handleExists = handleExists;
  return next();
};

const validateInputSale2 = (req, res, next) => {
  const { handleExists } = req;
  if (!handleExists.productExist) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!handleExists.quantityExist) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (handleExists.quantityIsZero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateUpdateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (Number(quantity) <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validationInputName,
  validationInputId,
  validateInputSale1,
  validateInputSale2,
  validateUpdateQuantity,
};