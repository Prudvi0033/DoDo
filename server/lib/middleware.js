import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export const protectRotue = async (req, res, next) => {
    try {
        const token = req.cookies['dodo-token']
        if(!token){
            return res.json({
                msg : "Unauthorized User"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne(decoded._id).select("-password")

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;
        req.userId = user._id;

        next()
        
    } catch (error) {
        console.log("Error in protect Route",error);
    }
}