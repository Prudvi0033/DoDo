import express from 'express'
import { config } from 'dotenv';
import mongoDB from './lib/db.js';

import authRotues from "./routes/auth.route.js"
import notesRoutes from "./routes/notes.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()

config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",  
    credentials : true
}))

app.use("/api/auth",authRotues) 
app.use("/api/user",notesRoutes)

app.listen(8000,()=>{
    console.log("Server is running");
    mongoDB()
})