import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { 
        type: String,  
        default: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
    },
}, { timestamps: true }
);

userModel.methods.matchPassword = async function matchPassword (enteredPassword) {
    const match = await bcrypt.compare(enteredPassword, this.password);
    return match;
}

userModel.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);
export default User;