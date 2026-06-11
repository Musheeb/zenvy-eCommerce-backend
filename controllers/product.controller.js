const { validate } = require("../validators/validate.validator");
const { ProductSchema } = require("../validators/product.validator");

const ProductService = require("../services/product.services");

const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.addProducts = async (req, res, next) => {
  try {
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

    const sku = await ProductService.checkSkuDuplication(req.body.sku);
    if (sku) {
      return res.status(400).json({
        message: req.t("PRODUCT.SKU_ALREADY_EXISTS"),
      });
    }

    const product = await ProductService.create({
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

exports.getProductsList = async (req, res, next) => {
  try {
    validate(ProductSchema.GET_PRODUCTS, req.query);
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = Number.parseInt(req.query.skip) || 0;
    const search = req.query.search;
    const products = await ProductService.getProductsList(
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
