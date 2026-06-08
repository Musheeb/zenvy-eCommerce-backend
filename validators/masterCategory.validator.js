const Joi = require("joi");

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

exports.CategorySchema = {
  ADD_CATEGORY: Joi.object({
    name: Joi.string().required(),
  }),
  DELETE_CATEGORY: Joi.object({
    categoryId: Joi.string().pattern(MONGO_ID_REGEX).required().strict(),
  }),
};
