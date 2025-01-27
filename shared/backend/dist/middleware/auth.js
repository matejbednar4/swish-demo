import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
export const verifyJwt = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "You need to provide a JWT" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decodedJwt = jwt.verify(token, JWT_SECRET);
        req.user = JSON.parse(JSON.stringify(decodedJwt));
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
