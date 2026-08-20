import { validate } from "../validators/validate.validator";
import { ProductSchema } from "../validators/product.validator";

const ProductService = require("../services/product.services");
import {
  checkSkuDuplication,
  create,
  getProductsListService,
  get,
  deleteProductService,
} from "../services/product.services";

import uploadToCloudinary from "../utils/uploadToCloudinary";
import { deleteImage } from "../utils/cloudinary";

import { Request, Response, NextFunction } from "express";

export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!process.env.TEMP_FOLDER_FOR_CLOUDINARY)
      throw new Error("Cloudinary temporary folder not found");
    if (!req.user) throw new Error("User not authenticated");
    validate(ProductSchema.ADD_PRODUCT, req.body);
    const uploadedImages = [];
    for (const [index, file] of req.files.entries()) {
      const result = await uploadToCloudinary(
        file.buffer,
        process.env.TEMP_FOLDER_FOR_CLOUDINARY,
      );

      uploadedImages.push({
        publicId: result.public_id,
        url: result.secure_url,
        isPrimary: index === 0 ? true : false,
      });
    }

    const sku = await checkSkuDuplication(req.body.sku);
    if (sku) {
      return res.status(400).json({
        message: req.t("PRODUCT.SKU_ALREADY_EXISTS"),
      });
    }

    const product = await create({
      ...req.body,
      images: uploadedImages,
      addedBy: req.user._id,
    });

    return res.status(201).json({
      message: req.t("PRODUCT.PRODUCT_CREATED"),
      data: product,
    });
  } catch (e) {
    next(e);
  }
};

export const getProductsList = async (
  req: Request<{}, {}, {}, { limit: string; skip: string; search: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new Error("User not authenticated");
    validate(ProductSchema.GET_PRODUCTS, req.query);
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = Number.parseInt(req.query.skip) || 0;
    const search = req.query.search;
    const products = await getProductsListService(
      limit,
      skip,
      search,
      req.user._id,
    );
    return res.status(200).json({
      message: req.t("PRODUCT.PRODUCTS_FETCHED"),
      ...products,
    });
  } catch (e) {
    throw e;
  }
};

export const deleteProduct = async (
  req: Request<{ productId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const product = await get(productId);
    if (!product)
      return res.status(400).json({
        message: req.t("PRODUCT.PRODUCT_NOT_FOUND"),
      });
    const deletedProduct = await deleteProductService(productId); // Deletes and returns the deleted product.
    if (deletedProduct && deletedProduct?.images?.length > 0) {
      // Delete all the images from cloudinary.
      const publicIds = deletedProduct?.images?.map((image) => image?.publicId);
      await Promise.all(publicIds.map((id) => deleteImage(id)));
    }
    return res.status(200).json({
      message: req.t("PRODUCT.PRODUCT_DELETED_SUCCESSFULLY"),
      data: deletedProduct,
    });
  } catch (e) {
    throw e;
  }
};
