import { Types } from "mongoose";

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface UserAccessTokenPayload {
  _id: Types.ObjectId | string;
  email: string;
  role: string;
}
