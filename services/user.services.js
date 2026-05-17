const bcrypt = require("bcrypt");

const UserModel = require("../models/User.model");

exports.create = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (e) {
    throw e;
  }
};

exports.get = async (id) => {
  try {
    return await UserModel.findOne({ _id: id });
  } catch (e) {
    throw e;
  }
};

exports.verifyEmailAddress = async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (e) {
    throw e;
  }
};

/**
 *
 * @param {Object} user - User data
 * @param {Sting} password - Password provided by the user in the payload
 * @returns Password validation(Boolean)
 */
exports.validateUserPassword = async (user, password) => {
  try {
    const userWithPassword = await UserModel.findOne({ _id: user._id }).select(
      "password",
    );
    return await bcrypt.compare(password, userWithPassword?.password);
  } catch (e) {
    throw e;
  }
};
