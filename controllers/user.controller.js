const UserModel = require("../models/User.model");
const { validate } = require("../validators/validate.validator");
const { UserSchema } = require("../validators/user.validator");
const generateJwt = require("../utils/generateJwt");

const UserService = require("../services/user.services");
const { sendEmail } = require("../emails/sendEmail");

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
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token cookies life will be 7 days.
    });
    return res.status(201).json({
      message: req.t("AUTH.REGISTER_SUCCESS"),
      data: userObj,
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    validate(UserSchema.LOGIN, req.body);
    const password = req.body.password;
    const email = req.body.email.trim().toLowerCase();
    const user = await UserService.verifyEmailAddress(email);
    if (!user) {
      return res.status(400).json({
        message: req.t("AUTH.INVALID_CREDENTIALS"),
      });
    }
    const validatedPassword = await UserService.validateUserPassword(
      user,
      password,
    );
    if (!validatedPassword) {
      return res.status(400).json({
        message: req.t("AUTH.INVALID_CREDENTIALS"),
      });
    }
    const { accessToken, refreshToken } = generateJwt({
      _id: user._id,
      email: email,
      role: user.role,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.STAGE === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token cookies life will be 7 days.
    });
    return res.status(200).json({
      message: req.t("AUTH.LOGIN_SUCCESS"),
      data: "User data",
      accessToken,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    validate(UserSchema.FORGOT_PASSWORD, req.body);
    const email = req.body.email.trim().toLowerCase();
    const user = await UserService.verifyEmailAddress(email);
    if (!user) {
      return res.status(400).json({
        message: req.t("AUTH.EMAIL_DOES_NOT_EXIST"),
      });
    }
    await sendEmail(email);
    return res.status(200).json({
      message: req.t("AUTH.LINK_SENT_TO_PROVIDED_EMAIL"),
      data: email,
    });
  } catch (e) {
    next(e);
  }
};
