import type { Application } from "express";
import auth from "../middlewares/auth.middleware";

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/master/category.controller");

const categoryRouter = async (app: Application) => {
  app.post("/add-category", auth, addCategory);
  app.get("/get-categories", auth, getCategories);
  app.delete("/delete-category/:categoryId", auth, deleteCategory);
};

export default categoryRouter;
