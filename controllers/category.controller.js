const CategoryService = require("../services/masterCategory.services");
const { CategorySchema } = require("../validators/masterCategory.validator");
const { validate } = require("../validators/validate.validator");

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
