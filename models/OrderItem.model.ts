import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MasterCategory",
      required: true,
    },
    quantity: {
      type: Number,
    },
    priceAtPurchase: {
      type: Number,
    },
    currency: {
      type: String,
      default: "USD",
    },
    review: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const OrderItemModel = mongoose.model(
  "OrderItem",
  OrderItemSchema,
  "order_items",
);

export default OrderItemModel;
