import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
},{timestamps : true})

const Notes = mongoose.model("Notes",notesSchema)

export default Notes