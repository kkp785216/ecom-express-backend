import { Request, Response } from 'express';
import User from '../models/userModels';
import expressAsyncHandler from 'express-async-handler';

const createUser = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { email } = req.body;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            // Create a new user
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        else {
            // User already exist
            // res.status(501).json({
            //     msg: "User already exist",
            //     succeed: false
            // });
            throw new Error("User already exists!");
        }
    }
);

export { createUser };