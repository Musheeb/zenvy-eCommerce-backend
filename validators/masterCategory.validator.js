const Joi = require("joi");

exports.CategorySchema = {
  ADD_CATEGORY: Joi.object({
    name: Joi.string().required(),
  }),
};
