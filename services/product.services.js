const ProductModel = require("../models/Product.model");

exports.create = async (data) => {
  try {
    return await ProductModel.create(data);
  } catch (e) {
    throw e;
  }
};

exports.checkSkuDuplication = async (sku) => {
  try {
    return await ProductModel.findOne({ sku });
  } catch (e) {
    throw e;
  }
};
