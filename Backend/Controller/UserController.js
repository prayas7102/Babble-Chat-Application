const generateToken = require('../config/generateToken');
const User = require('../Models/UserModel')

const registerUser = async (req, res) => {

    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Enter all fields');
    }

    const requiredUser = await User.findOne({ email });

    if (requiredUser) {
        console.log(requiredUser)
        res.status(400);
        throw new Error('User already exists');
    }
    else {
        const user = await User.create({ name, email, password, pic });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // pic
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400);
            throw new Error("Failed to Create the USER")
        }
    }
}

// for logging in the user
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email/Password");
    }
}

module.exports = { registerUser, authUser };