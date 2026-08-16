import type { Application } from "express";

import auth from "../middlewares/auth.middleware";
import {
  addProducts,
  getProductsList,
  deleteProduct,
} from "../controllers/product.controller";
import upload from "../middlewares/multer.middleware";

const productRoutes = async (app: Application) => {
  app.post("/add-product", auth, upload.array("images", 4), addProducts);
  app.get("/get-products-list", auth, getProductsList);
  app.delete("/delete-product/:productId", auth, deleteProduct);
};

export default productRoutes;
