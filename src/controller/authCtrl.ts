import { Request, Response } from "express";
import User from "../models/userModels";
import expressAsyncHandler from "express-async-handler";
import type {
  LoginRequestBody,
  UserProfileRequestBody,
} from "../constants/types";
import { generateToken } from "../config/jwtToken";

// Create a new user
const createUser = expressAsyncHandler(
  async (
    req: Request<unknown, unknown, UserProfileRequestBody>,
    res: Response
  ) => {
    try {
      const { email, firstName, mobile, password, role, lastName } = req.body;
      if (role && role !== "user")
        throw new Error("You don't have to premission to create a admin user");
      const findUser = await User.findOne({ email });
      if (!findUser) {
        // Create a new user
        const newUser = await User.create({
          firstName,
          lastName,
          password,
          mobile,
          email,
        });
        res.json(newUser);
      } else {
        // User already exist
        throw new Error("User already exists!");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
);

// Login existing user
const loginUser = expressAsyncHandler(
  async (req: Request<unknown, unknown, LoginRequestBody>, res: Response) => {
    const { email, password } = req.body;
    // Check if user exist or not
    const findUser = await User.findOne({ email });
    if (findUser) {
      if (await findUser.isPasswordMatched(password)) {
        const findUserRes = findUser.toJSON(); // converting MongoDB Object to a normal Object
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = findUserRes; // removing "password" field from response
        res.json({
          ...rest,
          token: generateToken(findUser._id),
        }); // sending user detail without "password"
      } else {
        throw new Error("Incorrect Password!");
      }
    } else {
      throw new Error("User doesn't exist!");
    }
  }
);

export { createUser, loginUser };
