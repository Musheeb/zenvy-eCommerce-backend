const CategoryModel = require("../models/master/Category.model");

exports.addCategory = async (req, res, next) => {
  try {
    return res.status(201).json({
      message: req.t("CATEGORY.CREATED"),
    });
  } catch (e) {
    next(e);
  }
};
