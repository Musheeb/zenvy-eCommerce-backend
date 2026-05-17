const { register, login } = require("../controllers/user.controller");

module.exports = async (app) => {
  app.post("/register", register);
  app.post("/login", login);
};
