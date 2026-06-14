const ProductModel = require("../models/Product.model");
const cloudinary = require("../utils/cloudinary");

exports.create = async (data) => {
  try {
    return await ProductModel.create(data);
  } catch (e) {
    throw e;
  }
};

exports.get = async (id) => {
  try {
    return await ProductModel.findOne({ _id: id });
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

exports.deleteProduct = async (productId) => {
  try {
    return await ProductModel.findByIdAndDelete(productId, {
      new: true,
    });
  } catch (e) {
    throw e;
  }
};

exports.getProductsList = async (limit, skip, search, user) => {
  try {
    const matchedCondition = {
      addedBy: user,
    };

    if (search?.trim()) {
      matchedCondition.productTitle = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const products = await ProductModel.aggregate([
      {
        $match: matchedCondition,
      },
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "master_categories",
                localField: "category",
                foreignField: "_id",
                as: "categories",
              },
            },
            {
              $unwind: {
                path: "$categories",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                productTitle: 1,
                sku: 1,
                images: 1,
                price: 1,
                currency: 1,
                addedBy: 1,
                quantity: 1,
                isActive: 1,
                description: 1,
                createdAt: 1,
                category: 1,
                categoryName: "$categories.name",
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
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
