import { UserDocument } from "../models/User.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      files: Express.Multer.File[];
    }
  }
}

export {};
