const ProductModel = require("../models/Product.model");
const cloudinary = require("../utils/cloudinary");

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

exports.deleteProductsWithCategory = async (categoryId) => {
  try {
    const products = await ProductModel.find({ category: categoryId });
    if (products.length === 0) return;
    for (let product of products) {
      await Promise.all(
        product?.images?.map((image) => {
          return cloudinary.deleteImage(image?.publicId);
        }),
      );
      await ProductModel.findByIdAndDelete(product._id);
    }
  } catch (e) {
    throw e;
  }
};

exports.getProductsList = async (limit, skip, search, user) => {
  try {
    const products = await ProductModel.aggregate([
      {
        $match: {
          addedBy: user,
        },
      },
      {
        $match: { productTitle: new RegExp(search, "i") },
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            { $sort: { createdAt: -1 } },
          ],
          total: [{ $count: "count" }],
        },
      },
    ]);
    return {
      total: products?.[0]?.total[0]?.count || 0,
      limit,
      skip,
      data: products?.[0]?.data || [],
    };
  } catch (e) {
    throw e;
  }
};
