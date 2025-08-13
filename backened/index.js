import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./db/index.js";
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000", // exact origin of your frontend
    credentials: true, // allow cookies / auth headers
  })
);


app.use(cookieParser()); // ✅ This is important for req.cookies


import AuthRouter from '../backened/routes/auth.routes.js'
import { authorizeRoles, protectRoutes } from './middleware/authMiddleware.js';


app.use("/api/v1", AuthRouter);

app.get("/hello", protectRoutes, authorizeRoles('admin'),(req, res) => {
  return res.status(200).json({
    message : "OK"
  })
})




connectDB()
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



// app.listen(PORT, () => console.log(`Server Started :: Running at ${PORT}`))