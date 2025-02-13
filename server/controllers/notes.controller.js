import generateContent from "../lib/ai.js"
import Notes from "../models/notes.model.js"

export const createNotes = async (req, res) => {
    const { title, content } = req.body
    const userId = req.userId

    try {
        if (!title || !content) {
            return res.status(401).json({
                msg: "All fields must be filled"
            })
        }

        const notes = await Notes.create({
            user: userId,
            title,
            content
        })

        res.status(200).json({ notes })
    } catch (error) {
        console.log("Error in create Notes", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getNotes = async (req, res) => {
    try {
        const filter = req.query.filter || ""

        const notes = await Notes.find({
            $or: [
                { title: { $regex: filter, $options: "i" } },
                { content: { $regex: filter, $options: "i" } },
            ]
        })

        res.json({
            notes: notes
        })
    } catch (error) {
        console.log("Error in getting notes");
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const updateNotes = async (req, res) => {
    try {
        const fields = ["title", "content"]
        const notesId = req.params.id

        if (!notesId) {  
            return res.status(400).json({
                msg: "Invalid Note ID"
            })
        }

        const updatedData = {}

        for (const field of fields) {
            if (req.body[field]) {
                updatedData[field] = req.body[field]
            }
        }

        const notes = await Notes.findByIdAndUpdate(
            notesId,
            { $set: updatedData },
            { new: true }
        )

        if (!notes) {
            return res.status(404).json({
                msg: "No notes found"
            })
        }

        return res.json({ notes })
        
    } catch (error) {
        console.log("Error in updating notes", error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const notesId = req.params.id
    if(!notesId){
        return res.json({
            msg : "No Notes Found"
        })
    }
    await Notes.findByIdAndDelete(notesId)
    res.json({
        msg : "Succesfully Deleted"
    })
    } catch (error) {
        console.log("Error in deleting notes");
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const improveNotes = async (req, res) => {
    
}
export const summarizeNotes = async (req, res) => {

}


export const test = async (req, res) => {
    const prompt = req.body
    if (!prompt) {
        return req.json({ msg: "Please Enter prompt" })
    }

    try {
        const response = await generateContent(prompt)
        res.json(response)
    } catch (error) {
        console.log("Error in gen", error);
    }
}