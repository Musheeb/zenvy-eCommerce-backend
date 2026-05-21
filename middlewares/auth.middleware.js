const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

module.exports = async (req, res, next) => {
  try {
    const bearerRaw = req.headers["authorization"];
    if (!bearerRaw || !bearerRaw.startsWith("Bearer ")) {
      return res.status(401).json({
        message: req.t("AUTH.AUTH_TOKEN_MISSING_OR_EXPIRED"),
      });
    }
    const token = bearerRaw.split(" ")[1];
    const decodedTokenDetails = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    );
    const user = await UserModel.findOne({ _id: decodedTokenDetails._id });
    if (!user) {
      return res.status(401).json({
        message: req.t("AUTH.USER_NOT_FOUND"),
      });
    }
    req.user = user;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "AUTH.UNAUTHORIZED",
      });
    }

    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "AUTH.TEMPERED_TOKEN",
      });
    }
  }
};
