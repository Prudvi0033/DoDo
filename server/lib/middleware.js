import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["dodo-token"];
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;
        req.userId = user._id;

        next();
    } catch (error) {
        console.log("Error in protectRoute:", error);
        return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
    }
};
