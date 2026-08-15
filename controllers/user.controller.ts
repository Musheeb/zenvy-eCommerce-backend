import UserModel from "../models/User.model";
import { validate } from "../validators/validate.validator";
import { UserSchema } from "../validators/user.validator";
import generateJwt from "../utils/generateJwt";
import { Request, Response, NextFunction } from "express";

import UserService from "../services/user.services";
import ResetPasswordService from "../services/resetPassword.services";

import type { RegisterBody } from "../types/user.types.ts";

import { sendEmail } from "../emails/sendEmail";

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction,
) => {
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

export const login = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction,
) => {
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

export const forgotPassword = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    validate(UserSchema.FORGOT_PASSWORD, req.body);
    const email = req.body.email.trim().toLowerCase();
    const user = await UserService.verifyEmailAddress(email);
    if (!user) {
      return res.status(400).json({
        message: req.t("AUTH.EMAIL_DOES_NOT_EXIST"),
      });
    }
    const resetPasswordLink =
      await ResetPasswordService.generateAndSaveResetPasswordLink(user._id);
    await sendEmail(resetPasswordLink, email);
    return res.status(200).json({
      message: req.t("AUTH.LINK_SENT_TO_PROVIDED_EMAIL"),
    });
  } catch (e) {
    next(e);
  }
};

export const resetPassword = async (
  req: Request<
    { token: string },
    unknown,
    { password: string; confirmPassword: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    validate(UserSchema.RESET_PASSWORD_TOKEN, req.params);
    validate(UserSchema.RESET_PASSWORD, req.body);
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: req.t("AUTH.PASSWORD_CONFIRM_PASSWORD_DIFFERENT"),
      });
    }
    const hashedToken = ResetPasswordService.getHashtoken(token);
    const tokenDocument = await ResetPasswordService.getByToken(hashedToken);
    if (!tokenDocument || tokenDocument.tokenValidTill < new Date()) {
      return res.status(401).json({
        message: req.t("AUTH.SESSION_EXPIRED"),
      });
    }
    const hashedPassword = await UserService.getHashedPassword(password);
    await UserService.patch(tokenDocument.user, { password: hashedPassword });
    await ResetPasswordService.removeAll(tokenDocument.user);
    return res.status(200).json({
      message: req.t("AUTH.PASSWORD_RESET_SUCCESSFULLY"),
    });
  } catch (e) {
    next(e);
  }
};
