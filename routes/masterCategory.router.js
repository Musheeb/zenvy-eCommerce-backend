const auth = require("../middlewares/auth.middleware");

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category.controller");

module.exports = async (app) => {
  app.post("/add-category", auth, addCategory);
  app.get("/get-categories", auth, getCategories);
  app.delete("/delete-category", auth, deleteCategory);
};
