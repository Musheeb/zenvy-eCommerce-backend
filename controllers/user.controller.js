const UserModel = require("../models/User.model");
const { validate } = require("../validators/validate.validator");
const { UserSchema } = require("../validators/user.validator");
const generateJwt = require("../utils/generateJwt");

const UserService = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    validate(UserSchema.REGISTER, req.body);
    const verifyEmailAddress = await UserService.verifyEmailAddress(
      req.body.email,
    );
    if (verifyEmailAddress) {
      return res.status(400).json({
        message: req.t("AUTH.EMAIL_ALREADY_EXISTS"),
      });
    }
    const user = await UserService.create(req.body);
    const userObj = user.toObject();
    delete userObj.password;
    const { accessToken, refreshToken } = generateJwt({
      _id: user._id,
      email: req.body.email,
      role: "user",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.STAGE === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookies life will be 7 days.
    });
    return res.status(200).json({
      message: req.t("AUTH.REGISTER_SUCCESS"),
      data: userObj,
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};
