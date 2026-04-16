require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const adminRoutes = require("./routes/admin.js");

adminRoutes(app);

const PORT = process.env.PORT || 3000;
const connectDb = require("./db/config.js");

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on PORT ${PORT}`);
});

connectDb();
