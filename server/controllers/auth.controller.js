import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from "../models/user.model.js"


export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(401).json({
                msg: "All fields should be filled"
            })
        }

        if (password.length < 4) {
            return res.status(401).json({
                msg: "Password must be < 4"
            })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(401).json({
                msg: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        

        const user = await User.create({
            username,
            password: hashedPassword,
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("dodo-token",token, {
            httpOnly : true,
            maxAge : 7 * 24 * 60 * 60 * 1000,
            sameSite : "Strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({
            msg: "Registeration Succesfull",
            user: {
                _id: user._id,
                username: user.username
            },
        })
    } catch (error) {
        console.log("Error in Signup", error);
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.json({
                msg: "All fields should be filled"
            })
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid Credentials"
            })
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("dodo-token",token, {
            httpOnly : true,
            maxAge : 7 * 24 * 60 * 60 * 1000,
            sameSite : "Strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({
            msg: "Login successful",
            user: {
                _id: user._id,
                username: user.username
            },
        })
    } catch (error) {
        console.log("Error in login", error);

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('dodo-token')
        res.status(200).json({
            msg : "Logout Successfull"
        })
    } catch (error) {
        console.log("Error in Loging Out");   
    }
}

export const getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized: No user data available" });
        }

        res.status(200).json({
            _id: req.user._id,
            username: req.user.username,
            profilePicture: req.user.profilePicture || null,
        });
    } catch (error) {
        console.error("Error in getUser", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

