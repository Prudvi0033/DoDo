import express from 'express'
import { config } from 'dotenv';
import mongoDB from './lib/db.js';

import authRotues from "./routes/auth.route.js"
import notesRoutes from "./routes/notes.route.js"
import cookieParser from 'cookie-parser';

const app = express()

config()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRotues)
app.use("/api/user",notesRoutes)

app.listen(8000,()=>{
    console.log("Server is running");
    mongoDB()
})