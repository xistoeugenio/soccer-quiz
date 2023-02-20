import mongoose from "mongoose";


const matchesSchema = new mongoose.Schema({
    options: {
        type: Array,
        required: true
    },
    info: {
        type: Object,
        required: true
    },
    rightAnswer: {
        type: Object,
        required: true
    },
},
    { timestamps: true }
)

export default mongoose.model("Match", matchesSchema)