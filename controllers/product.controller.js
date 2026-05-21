const { validate } = require("../validators/validate.validator");
const { ProductSchema } = require("../validators/product.validator");

const ProductService = require("../services/product.services");

exports.addProducts = async (req, res, next) => {
  try {
    validate(ProductSchema.ADD_PRODUCT, req.body);
    const product = await ProductService.create({ ...req.body });
    return res.status(201).json({
      message: req.t("PRODUCT.PRODUCT_CREATED"),
      data: product,
    });
  } catch (e) {
    next(e);
  }
};
