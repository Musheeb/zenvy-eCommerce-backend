const Joi = require("joi");

exports.UserSchema = {
  REGISTER: Joi.object({
    username: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  LOGIN: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
