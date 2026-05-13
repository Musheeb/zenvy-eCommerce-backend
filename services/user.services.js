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
