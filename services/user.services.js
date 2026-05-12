const UserModel = require("../models/User.model");

exports.create = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (e) {
    next(e);
  }
};
