const crypto = require("crypto");

const ResetPasswordModel = require("../models/ResetPassword.model");

exports.create = async (data) => {
  try {
    return await ResetPasswordModel.create(data);
  } catch (e) {
    throw e;
  }
};

exports.removeAll = async (userId) => {
  try {
    return await ResetPasswordModel.deleteMany({ user: userId });
  } catch (e) {
    throw e;
  }
};

exports.getByToken = async (token) => {
  try {
    return await ResetPasswordModel.findOne({ token });
  } catch (e) {
    throw e;
  }
};

exports.getHashtoken = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

exports.generateResetPasswordLink = function (hashedToken) {
  return `${process.env.BASE_URL}/reset-password/${hashedToken}`;
};

exports.generateAndSaveResetPasswordLink = async (userId) => {
  try {
    if (!userId) {
      throw new Error("UserId is required");
    }
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = this.getHashtoken(rawToken);
    const savedData = await this.create({
      user: userId,
      token: hashedToken,
      tokenValidTill: Date.now() + 5 * 60 * 1000, // document will be alive for 5 minutes only in DB.
    });
    if (savedData) {
      return await this.generateResetPasswordLink(rawToken);
    }
    return null;
  } catch (e) {
    throw e;
  }
};
