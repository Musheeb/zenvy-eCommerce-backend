import { Application } from "express";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller";

export default async (app: Application) => {
  app.post("/register", register);
  app.post("/login", login);
  app.post("/forgot-password", forgotPassword);
  app.post("/reset-password/:token", resetPassword);
};
