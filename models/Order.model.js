const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
    },
    currency: {
      type: String,
      default: "USD",
    },
    orderCancelReason: {
      type: String,
      default: null,
    },
    deliveryTimestamp: {
      type: Date,
    },
    orderTimestamp: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema, "orders");
