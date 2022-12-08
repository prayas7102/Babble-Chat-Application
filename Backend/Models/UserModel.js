const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pic: {
            type: String, required: true,
            default: "https://images.unsplash.com/photo-1667450108198-4cccf1fef702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        },
    },
    {
        timestamps: true
    }
);

userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre('save', async function (next) {
    if (!this.isModified) { // if users is regisetring for first time
        next();
    }
    // 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);
module.exports = User;