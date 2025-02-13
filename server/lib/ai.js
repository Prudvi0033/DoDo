import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateContent = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text()
    } catch (error) {
        console.log("Error in generating response", error);
    }
}

export default generateContent