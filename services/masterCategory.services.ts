import { Types, QueryFilter } from "mongoose";

import CategoryModel from "../models/master/Category.model";

interface MasterCategory {
  name: string;
  isActive?: boolean;
  addedBy: string | Types.ObjectId;
}

export const create = async (data: MasterCategory) => {
  try {
    return await CategoryModel.create(data);
  } catch (e) {
    throw e;
  }
};

export const get = async (id: string | Types.ObjectId) => {
  try {
    return await CategoryModel.findOne({ _id: id });
  } catch (e) {
    throw e;
  }
};

export const getByName = async (
  query: QueryFilter<{ name: string; isActive: boolean }>,
) => {
  try {
    return await CategoryModel.findOne(query);
  } catch (e) {
    throw e;
  }
};

export const getAllCategories = async (userId: string | Types.ObjectId) => {
  try {
    return await CategoryModel.find({ addedBy: userId, isActive: true })
      .select("_id name isActive addedBy createdAt")
      .sort({ createdAt: -1 });
  } catch (e) {
    throw e;
  }
};

export const deleteCategory = async (id: string | Types.ObjectId) => {
  try {
    return await CategoryModel.findByIdAndDelete(id);
  } catch (e) {
    throw e;
  }
};
