const CategoryService = require("../../services/masterCategory.services");
const ProductService = require("../../services/product.services");
const { CategorySchema } = require("../../validators/masterCategory.validator");
const { validate } = require("../../validators/validate.validator");

exports.addCategory = async (req, res, next) => {
  try {
    validate(CategorySchema.ADD_CATEGORY, req.body);
    const sameCategoryDetails = await CategoryService.getByName({
      name: req.body.name,
      isActive: true,
    });
    if (sameCategoryDetails) {
      return res.status(400).json({
        message: req.t("CATEGORY.CATEGORY_ALREADY_EXISTS"),
      });
    }
    const category = await CategoryService.create({
      ...req.body,
      addedBy: req.user._id,
    });
    return res.status(201).json({
      message: req.t("CATEGORY.CREATED"),
      data: category,
    });
  } catch (e) {
    next(e);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const categories = await CategoryService.getAllCategories(userId);
    return res.status(200).json({
      message: req.t("CATEGORY.CATEGORIES_LIST_FETCHED"),
      data: categories,
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    validate(CategorySchema.DELETE_CATEGORY, req.params);
    const { categoryId } = req.params;
    const category = await CategoryService.get(categoryId);
    if (!category) {
      return res.status(400).json({
        message: req.t("CATEGORY.NOT_FOUND"),
      });
    }
    const deletedCategory = await CategoryService.deleteCategory(categoryId);
    if (deletedCategory) {
      await ProductService.deleteProductsWithCategory(deletedCategory._id);
      return res.status(200).json({
        message: req.t("CATEGORY.CATEGORY_DELETED"),
      });
    }
    return res.status(400).json({
      message: req.t("CATEGORY.CATEGORY_DELETION_FAILED"),
    });
  } catch (e) {
    next(e);
  }
};
