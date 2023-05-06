import { Types } from "mongoose";

type LoginRequestBody = {
  email: string;
  password: string;
};

type UserProfileResponse = {
  _id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  mobile: string;
  role: "user" | "admin";
};

type UserProfileRequestBody = Omit<UserProfileResponse, "_id">;

type UserProfileDelieverResponse = Omit<UserProfileResponse, "password">;

export {
  LoginRequestBody,
  UserProfileResponse,
  UserProfileRequestBody,
  UserProfileDelieverResponse,
};
