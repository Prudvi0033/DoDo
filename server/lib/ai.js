import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDto0rtU31Anj2uyq6szy_ZTdPKvWmmWH0");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateContent = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.log("Error in generating response", error);
    }
};

export default generateContent;
