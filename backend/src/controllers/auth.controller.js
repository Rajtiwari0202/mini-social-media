const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

async function registerUser(req, res) {

    try {

        const {
            username,
            email,
            password,
        } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
};