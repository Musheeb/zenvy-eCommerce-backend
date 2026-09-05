import ProductModel from "../models/Product.model";
// import cloudinary from "cloudinary";
import cldnry from "cloudinary";
const cloudinary = cldnry.v2;
import { Types, QueryFilter } from "mongoose";

import type { Product } from "../types/product.types.ts";

export const create = async (data: Product) => {
  try {
    return await ProductModel.create(data);
  } catch (e) {
    throw e;
  }
};

export const get = async (id: string | Types.ObjectId) => {
  try {
    return await ProductModel.findOne({ _id: id });
  } catch (e) {
    throw e;
  }
};

export const checkSkuDuplication = async (sku: string) => {
  try {
    return await ProductModel.findOne({ sku });
  } catch (e) {
    throw e;
  }
};

//All the cateogries with the product will also be deleted.
/**
 * 
 * @param categoryId - String
 * @returns - Detroyer object.
 */
export const deleteProductsWithCategory = async (
  categoryId: string | Types.ObjectId,
) => {
  try {
    const products = await ProductModel.find({ category: categoryId });
    if (products.length === 0) return;
    for (let product of products) {
      await Promise.all(
        product?.images?.map((image) => {
          return cloudinary.uploader.destroy(image?.publicId);
        }),
      );
      await ProductModel.findByIdAndDelete(product._id);
    }
  } catch (e) {
    throw e;
  }
};

//Delete product from the database.
/**
 * 
 * @param productId - String
 * @returns - Deleted product object.
 */
export const deleteProductService = async (
  productId: string | Types.ObjectId,
) => {
  try {
    return await ProductModel.findByIdAndDelete(productId, {
      new: true,
    });
  } catch (e) {
    throw e;
  }
};

export const getProductsListService = async (
  limit: number,
  skip: number,
  search: string,
  user: string | Types.ObjectId,
) => {
  try {
    const matchedCondition: QueryFilter<Product> = {
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

export const getNewArrivals = async () => {
  try {
  } catch (e) {
    console.log("Error occured in 'getNewArrivals' method", e);
    throw e;
  }
};
