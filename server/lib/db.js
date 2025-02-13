import mongoose from "mongoose";

const mongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MongoDB_URI)
        console.log(`MongoDB Connected : ${connection.connection.host}`);
    } catch (error) {
        console.log("Error in Connecting DataBase",error);
        process.exit(1)
    }
}

export default mongoDB