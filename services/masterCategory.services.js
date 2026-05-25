const CategoryModel = require("../models/master/Category.model");

exports.create = async (data) => {
  try {
    return await CategoryModel.create(data);
  } catch (e) {
    throw e;
  }
};

exports.getByName = async (query) => {
  try {
    return await CategoryModel.findOne(query);
  } catch (e) {
    throw e;
  }
};
