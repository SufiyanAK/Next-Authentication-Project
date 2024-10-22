import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a Username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an Email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a Password"],
            minlength: 8,
            select: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        forgetPassword: {
            token: String,
            expires: Date
        },
        verifyUser: {
            token: String,
            expires: Date
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;