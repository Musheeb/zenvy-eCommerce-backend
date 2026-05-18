const {
  register,
  login,
  forgotPassword,
} = require("../controllers/user.controller");

module.exports = async (app) => {
  app.post("/register", register);
  app.post("/login", login);
  app.post("/forgot-password", forgotPassword);
};
