import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import middleware from "i18next-http-middleware";
import i18next from "i18next";

import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
}

app.use(
  cors({
    origin:
      process.env.STAGE === "development"
        ? "http://localhost:5173"
        : "frontendURLHere",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(middleware.handle(i18next));

const adminRoutes = require("./routes/admin.router.js");
const userRoutes = require("./routes/user.router.js");
const productRoutes = require("./routes/product.router.js");
const categoryRoutes = require("./routes/masterCategory.router.js");

adminRoutes(app);
userRoutes(app);
productRoutes(app);
categoryRoutes(app);

const PORT = process.env.PORT || 3000;
const connectDb = require("./db/config.js");

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on PORT ${PORT}`);
});

connectDb();
