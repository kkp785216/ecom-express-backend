import mongoose from 'mongoose';
import { config } from 'dotenv';

// load env
config();

const DB_URI = process.env.DB_URI || "";

const dbConnect = async () => {
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
}

export default dbConnect;