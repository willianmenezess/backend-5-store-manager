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

module.exports = {
  validationInputName,
  validationInputId,
};