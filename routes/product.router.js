const auth = require("../middlewares/auth.middleware");
const { addProducts } = require("../controllers/product.controller");

module.exports = async (app) => {
  app.post("/add-product", auth, addProducts);
};
