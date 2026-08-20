import {
  getByName,
  create,
  getAllCategories,
  get,
  deleteCategory,
} from "../../services/masterCategory.services";
import { deleteProductsWithCategory } from "../../services/product.services";
import { CategorySchema } from "../../validators/masterCategory.validator";
import { validate } from "../../validators/validate.validator";

import type { Response, Request, NextFunction } from "express";

interface AddCategory {
  name: string;
}

exports.addCategory = async (
  req: Request<{}, {}, AddCategory>,
  res: Response,
  next: NextFunction,
) => {
  try {
    validate(CategorySchema.ADD_CATEGORY, req.body);
    const sameCategoryDetails = await getByName({
      name: req.body.name,
      isActive: true,
    });
    if (sameCategoryDetails) {
      return res.status(400).json({
        message: req.t("CATEGORY.CATEGORY_ALREADY_EXISTS"),
      });
    }
    if (!req.user) {
      throw new Error("User not authenticated");
    }
    const category = await create({
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

exports.getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new Error("User not authenticated");
    const userId = req.user._id;
    const categories = await getAllCategories(userId);
    return res.status(200).json({
      message: req.t("CATEGORY.CATEGORIES_LIST_FETCHED"),
      data: categories,
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteCategory = async (
  req: Request<{ categoryId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    validate(CategorySchema.DELETE_CATEGORY, req.params);
    const { categoryId } = req.params;
    const category = await get(categoryId);
    if (!category) {
      return res.status(400).json({
        message: req.t("CATEGORY.NOT_FOUND"),
      });
    }
    const deletedCategory = await deleteCategory(categoryId);
    if (deletedCategory) {
      await deleteProductsWithCategory(deletedCategory._id);
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
