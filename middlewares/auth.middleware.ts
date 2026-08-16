import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

import UserModel from "../models/User.model";

interface JwtPayloadWithId extends jwt.JwtPayload {
  _id: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerRaw = req.headers["authorization"];
    if (!bearerRaw || !bearerRaw.startsWith("Bearer ")) {
      return res.status(401).json({
        message: req.t("AUTH.AUTH_TOKEN_MISSING_OR_EXPIRED"),
      });
    }
    const token = bearerRaw.split(" ")[1];
    if (!token) throw new Error("Token not found");
    if (!process.env.JWT_ACCESS_TOKEN_SECRET)
      throw new Error("Key missing from environment");
    const decodedTokenDetails = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    ) as JwtPayloadWithId;
    if (!decodedTokenDetails._id)
      throw new Error("ID not found in the payload.");
    const user = await UserModel.findOne({ _id: decodedTokenDetails._id });
    if (!user) {
      return res.status(401).json({
        message: req.t("AUTH.USER_NOT_FOUND"),
      });
    }
    req.user = user;
    next();
  } catch (e: any) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({
        message: req.t("AUTH.UNAUTHORIZED"),
      });
    }

    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: req.t("AUTH.TEMPERED_TOKEN"),
      });
    }
  }
};

export default auth;
