import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    pic: { 
        type: String, 
        require: true, 
        default: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
    },
}, { timestamps: true }
);

const User = mongoose.model("User", userModel);
export default User;