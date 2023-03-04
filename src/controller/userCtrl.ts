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


// Get user profile
const updateProfile = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { id: userId } = req.query;
        const { firstName, lastName, email, mobile } = req.body;

        /* Error Handling Start */
        if (!req.query.id) throw new Error("Plz provide userId");
        if (firstName && firstName.length < 3) throw new Error("FirstName can't be less than 3 characters");
        if (lastName && lastName.length < 3) throw new Error("LastName can't be less than 3 characters");
        if (email) {
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) throw new Error("Invalid email address");
            if (await User.findOne({ _id: userId, email })) throw new Error("Email already in use!");
            else if (await User.findOne({ _id: { $ne: userId }, email })) throw new Error("Email already exists!");
        }
        if (mobile) { 
            if (!mobile.match(/^[0-9]{10}$/)) throw new Error("Invalid mobile no.");
            if (await User.findOne({ _id: userId, mobile })) throw new Error("Mobile already in use!");
            else if (await User.findOne({ _id: { $ne: userId }, mobile })) throw new Error("Mobile no. already exists!");
        }
        /* Error Handling Complete */

        try {
            const newValue = Object.fromEntries(
                Object.entries({ firstName, lastName, email, mobile }).map(([key, value]) => [key, value || null])
            );
            const findUser = await User.findOneAndUpdate(
                { _id: userId },
                newValue,
                { new: true }
            ).select("-password");
            if (findUser) {
                // Send User Profile except Password
                res.send(findUser);
            }
            else {
                // User doesn't exist
                throw new Error("User doesn't exist");
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }
);


// Delete user profile
const deleteProfile = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const { id: userId } = req.query;
        if (!req.query.id) throw new Error("Plz provide userId");
        try {
            const findUser = await User.findByIdAndDelete(userId).select("-password");
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

export { getProfile, deleteProfile, updateProfile };