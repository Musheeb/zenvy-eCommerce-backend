require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const middleware = require("i18next-http-middleware");
const i18next = require("./config/i18n.js");

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

adminRoutes(app);
userRoutes(app);
productRoutes(app);

const PORT = process.env.PORT || 3000;
const connectDb = require("./db/config.js");

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on PORT ${PORT}`);
});

connectDb();
