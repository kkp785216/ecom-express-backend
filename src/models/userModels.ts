import mongoose from 'mongoose'; // Erase if already required
import bcrypt from 'bcrypt';

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
});

//Export the model
export default mongoose.model('User', userSchema);