import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface JwtPayload {
  _id: Types.ObjectId;
  email: string;
  role: string;
}

const generateJwt = (payload: JwtPayload) => {
  try {
    const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

    if (!refreshSecret || !accessSecret) {
      throw new Error("JWT secretes are not configured");
    }

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "8d",
    });

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: "1m",
    });

    return {
      refreshToken,
      accessToken,
    };
  } catch (e) {
    console.log("Error occured while generating the JWT: ", e);
    throw e;
  }
};

export default generateJwt;
