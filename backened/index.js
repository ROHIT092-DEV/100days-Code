import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./db/index.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

import AuthRouter from '../backened/routes/auth.routes.js'

app.use("/api/v1", AuthRouter);




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