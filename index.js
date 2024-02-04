import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import router from './router/index.js';


const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', router);
async function start() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        app.listen(PORT, () => { console.log(`Server running at: http://localhost:${PORT}/`, process.env.PORT) });
    }
    catch (e) {
        console.log(e);
    }
}

start();