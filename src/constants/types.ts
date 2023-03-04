import { Types } from "mongoose";

type LoginRequestBody = {
    email: string;
    password: string;
}

type UserProfileResponse = {
    _id: Types.ObjectId;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role: "user" | "admin";
}

export {
    LoginRequestBody,
    UserProfileResponse
}