import "dotenv/config";
// import dotenv from "dotenv";
// dotenv.config({ quiet: true });
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import i18next from "./config/i18n";
import middleware from "i18next-http-middleware";
import cookieParser from "cookie-parser";

import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
}

app.use(
  cors({
    origin:
      process.env.STAGE === "development"
        ? "http://localhost:5173"
        : process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(middleware.handle(i18next));

const adminRoutes = require("./routes/admin.router.js");
import userRoutes from "./routes/user.router";
import productRoutes from "./routes/product.router";
import categoryRoutes from "./routes/masterCategory.router";

adminRoutes(app);
userRoutes(app);
productRoutes(app);
categoryRoutes(app);

const PORT = process.env.PORT || 3000;
import connectDb from "./db/config";

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
