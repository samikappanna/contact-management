import mongoose from "mongoose";
import { type } from "os";

const contactSchema = new mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "User",
        },
        name :{
            type: String,
            required: [true, "Please add a name"],
        },

        email:{
            type: String,
            required:[true, "Please add the email"]
        },

        phone:{
            type: String,
            required:[true, "Please add the phone number"]
        },

        

    },
    {
        timestamps: true,
    }
)

const Contact=mongoose.model("Contact", contactSchema);

export default Contact;