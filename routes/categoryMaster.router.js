const auth = require("../middlewares/auth.middleware");

const { addCategory } = require("../controllers/category.controller");

module.exports = async (app) => {
  app.post("/add-category", auth, addCategory);
};
