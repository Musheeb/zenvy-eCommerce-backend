import crypto from "crypto";
import { Types } from "mongoose";

import ResetPasswordModel from "../models/ResetPassword.model";

interface CreateResetPasswordDocument {
  token: string;
  tokenValidTill: Date | number;
  user: Types.ObjectId | string;
}

export const create = async (data: CreateResetPasswordDocument) => {
  try {
    return await ResetPasswordModel.create(data);
  } catch (e) {
    throw e;
  }
};

export const removeAll = async (userId: Types.ObjectId | string) => {
  try {
    return await ResetPasswordModel.deleteMany({ user: userId });
  } catch (e) {
    throw e;
  }
};

export const getByToken = async (token: string) => {
  try {
    return await ResetPasswordModel.findOne({ token });
  } catch (e) {
    throw e;
  }
};

export const getHashtoken = function (token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateResetPasswordLink = function (hashedToken: string) {
  return `${process.env.BASE_URL}/reset-password/${hashedToken}`;
};

export const generateAndSaveResetPasswordLink = async (
  userId: string | Types.ObjectId,
) => {
  try {
    if (!userId) {
      throw new Error("UserId is required");
    }
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = getHashtoken(rawToken);
    const savedData = await create({
      user: userId,
      token: hashedToken,
      tokenValidTill: Date.now() + 5 * 60 * 1000, // document will be alive for 5 minutes only in DB.
    });
    if (savedData) {
      return generateResetPasswordLink(rawToken);
    }
    return null;
  } catch (e) {
    throw e;
  }
};
