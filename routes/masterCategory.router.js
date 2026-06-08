const auth = require("../middlewares/auth.middleware");

const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/master/category.controller");

module.exports = async (app) => {
  app.post("/add-category", auth, addCategory);
  app.get("/get-categories", auth, getCategories);
  app.delete("/delete-category/:categoryId", auth, deleteCategory);
};
