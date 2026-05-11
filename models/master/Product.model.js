const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [40, "Name cannot exceed 40 characters"],
    },
    sku: {
      // Stock keeping unit.
      type: Number,
      required: true,
      unique: true,
    },
    images: {
      type: [String], //There will be image URLs as we are using cloudinary here.
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MasterCategory",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", ProductSchema, "products");
