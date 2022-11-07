import mongoose from "mongoose";


const playersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    league: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
    ,
    imgPlayer: {
        type: String,
    },
},
{ timestamps: true }
)

export default mongoose.model("Players", playersSchema)