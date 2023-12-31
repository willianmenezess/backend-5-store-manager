const Joi = require('joi');

const insertProductSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

module.exports = {
  insertProductSchema,
  // requiredProductSchema,
};