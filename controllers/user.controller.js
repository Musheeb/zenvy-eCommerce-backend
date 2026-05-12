const UserModel = require("../models/User.model");
const { validate } = require("../validators/validate.validator");
const { UserSchema } = require("../validators/user.validator");

const UserService = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    validate(UserSchema.REGISTER, req.body);
    // const user = await UserService.create(req.body);
    return res.status(200).json({
      message: req.t("AUTH.REGISTER_SUCCESS"),
      data: "user",
    });
  } catch (e) {
    next(e);
  }
};
