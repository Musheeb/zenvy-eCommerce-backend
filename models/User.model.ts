import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  role: "user" | "admin";
  profilePicture: string | null;
  phoneNumber: string | null;
  gender?: "male" | "female";
  dob: Date | null;
  isBlocked: boolean;
  isActive: boolean;
  password: string;
  googleId: string | null;
  authplatform: "local" | "google";
}

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "User name is required"],
      minLength: [3, "User name must be at least 3 characters"],
      maxLength: [40, "User name cannot exceed 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: Date,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      select: false,
    },
    googleId: {
      type: String,
      default: null,
      select: false,
    },
    authplatform: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  },
);

// 🔐 Hash password before saving
UserSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  } catch (error: any) {
    console.log("Error while updating the password. Error: ", error.message);
  }
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema, "users");

export default UserModel;
