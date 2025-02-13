import express from 'express'
import { config } from 'dotenv';
import monogoDB from './lib/db.js';

const app = express()
config()


app.listen(8000,()=>{
    console.log("Server is running");
    monogoDB()
})