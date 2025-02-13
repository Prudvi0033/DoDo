import generateContent from "../lib/ai.js"

export const test = async (req, res) => {
    const {prompt} = req.body
    if (!prompt) {
        return req.json({ msg: "Please Enter prompt" })
    }

    try {
        const response = await generateContent(prompt)
        res.json(response)
    } catch (error) {
        console.log("Error in gen",error);
    }
}