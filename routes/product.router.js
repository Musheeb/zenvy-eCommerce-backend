const auth = require("../middlewares/auth.middleware");
const { addProducts } = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");

module.exports = async (app) => {
  app.post("/add-product", auth, upload.array("images", 4), addProducts);
};
