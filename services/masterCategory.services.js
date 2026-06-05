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

exports.getAllCategories = async (userId) => {
  try {
    return await CategoryModel.find({ addedBy: userId, isActive: true })
      .select("_id name isActive addedBy createdAt")
      .sort({ createdAt: -1 });
  } catch (e) {
    throw e;
  }
};
