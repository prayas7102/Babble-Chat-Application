const mongoose = require('mongoose');
const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        pic: {
            type: String, required: true,
            default:"https://images.unsplash.com/photo-1667450108198-4cccf1fef702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userModel);
module.exports = User;