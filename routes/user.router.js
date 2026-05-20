const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");

module.exports = async (app) => {
  app.post("/register", register);
  app.post("/login", login);
  app.post("/forgot-password", forgotPassword);
  app.post("/reset-password/:token", resetPassword);
};
