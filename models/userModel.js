import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add the username"],

    },
    email:{
        type: String,
        required:[true,"Please add the user email"],
        unique: [true,"Email address already exists"],
    },
    
    password:{
        type: String,
        required:[true,"Please add the user password"],
    }
},{
    timestamps: true,
}
)

const User=mongoose.model("User",userSchema);
export default User;