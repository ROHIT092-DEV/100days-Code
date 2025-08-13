import jwt from "jsonwebtoken";

import { Auth } from "../models/auth.models.js";


export const protectRoutes = async(req, res, next) => {
  const token  = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
   console.log(token)


try {

  if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
  }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded)

    // 3️⃣ Fetch user from DB
    const user = await Auth.findById(decoded.id).select("-password");
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    // 4️⃣ Attach user to request
    req.user = user;
    next();

    

  
} catch (error) {
  console.log(error)
}
  
}


// ✅ Role check middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};