const Joi = require("joi");

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

exports.ProductSchema = {
  ADD_PRODUCT: Joi.object({
    productTitle: Joi.string().max(30).required(),
    category: Joi.string().pattern(MONGO_ID_REGEX).required().strict(),
    sku: Joi.string().required(), //CATEGORY-BRAND-TYPE-VARIANT-ID
    images: Joi.array().items(Joi.string()).max(4),
    description: Joi.string().max(1000),
    quantity: Joi.number(),
    currency: Joi.string(),
    price: Joi.number(),
  }),
};
