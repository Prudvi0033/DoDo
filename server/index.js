import express from 'express'
import { config } from 'dotenv';
import mongoDB from './lib/db.js';

import authRotues from "./routes/auth.route.js"
import notesRoutes from "./routes/notes.route.js"

const app = express()

config()

app.use(express.json())

app.use("/api/auth",authRotues)
app.use("/api/notes",notesRoutes)

app.listen(8000,()=>{
    console.log("Server is running");
    mongoDB()
})