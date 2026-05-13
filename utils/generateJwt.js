const jwt = require("jsonwebtoken");

module.exports = (payload) => {
  try {
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "8d",
      },
    );

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "8h",
    });

    return {
      refreshToken,
      accessToken,
    };
  } catch (e) {
    throw e;
  }
};
