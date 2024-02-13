import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/ErrorHandler.js";
dotenv.config();

const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);
async function start() {
    try {
        mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => { console.log("listening on port", PORT) });
    } catch (error) {
        console.log(error);
    }
}


start();