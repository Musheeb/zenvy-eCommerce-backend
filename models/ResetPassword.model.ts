import mongoose from "mongoose";

const ResetPasswordSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    tokenValidTill: {
      type: Date,
      required: true,
      expires: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const ResetPasswordModel = mongoose.model(
  "ResetPassword",
  ResetPasswordSchema,
  "reset_passwords",
);

export default ResetPasswordModel;
