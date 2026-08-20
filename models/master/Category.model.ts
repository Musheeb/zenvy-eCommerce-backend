import mongoose, { Document, Types } from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [40, "Name cannot exceed 40 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CategoryModel = mongoose.model(
  "MasterCategory",
  CategorySchema,
  "master_categories",
);

export default CategoryModel;
