const { register } = require("../controllers/user.controller");

module.exports = async (app) => {
  app.post("/register", register);
};
