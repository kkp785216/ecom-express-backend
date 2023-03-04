import { Request, Response } from 'express';
import User from '../models/userModels';
import expressAsyncHandler from 'express-async-handler';

// Get user profile
const getProfile = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { id: userId } = req.query;
        if (!req.query.id) throw new Error("Plz provide userId");
        try {
            const findUser = await User.findById(userId).select("-password");
            if (findUser) {
                // Send User Profile without Except Password
                res.send(findUser);
            }
            else {
                // User already exist
                throw new Error("User doesn't exist");
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }
);




export { getProfile };