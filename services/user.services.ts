import bcrypt from "bcrypt";
import { Types } from "mongoose";

import UserModel, { IUser } from "../models/User.model";
import type { RegisterBody } from "../types/user.types";

export const create = async (data: RegisterBody) => {
  try {
    return await UserModel.create(data);
  } catch (e) {
    throw e;
  }
};

export const get = async (id: string | Types.ObjectId) => {
  try {
    return await UserModel.findOne({ _id: id });
  } catch (e) {
    throw e;
  }
};

export const patch = async (
  id: string | Types.ObjectId,
  data: Partial<IUser>,
  params = {},
) => {
  try {
    return await UserModel.findByIdAndUpdate(
      id,
      { ...data },
      { returnDocument: "after" },
    );
  } catch (e) {
    throw e;
  }
};

export const verifyEmailAddress = async (email: string) => {
  try {
    return await UserModel.findOne({ email });
  } catch (e) {
    throw e;
  }
};

/**
 *
 * @param {Object} user - User data
 * @param {string} password - Password provided by the user in the payload
 * @returns Password validation(Boolean)
 */
export const validateUserPassword = async (
  user: IUser & { _id: string | Types.ObjectId },
  password: string,
) => {
  try {
    const userWithPassword = await UserModel.findOne({ _id: user._id }).select(
      "password",
    );
    if (!userWithPassword?.password)
      throw new Error("Previous password not found for this user");
    return await bcrypt.compare(password, userWithPassword.password);
  } catch (e) {
    throw e;
  }
};

export const getHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
