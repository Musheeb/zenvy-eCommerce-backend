import jwt, { JwtPayload } from "jsonwebtoken";

const generateAccessToken = async (payload: JwtPayload): Promise<string> => {
  try {
    if (!process.env.JWT_ACCESS_TOKEN_SECRET)
      throw new Error("JWT secret to generate access token is not configured");
    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "8h",
    });
    return token;
  } catch (e) {
    console.log("Error occured while generating the access token: ", e);
    throw e;
  }
};

export default generateAccessToken;
