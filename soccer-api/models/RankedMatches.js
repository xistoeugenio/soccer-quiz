import mongoose from "mongoose";

const RankedMatches = new mongoose.Schema({
    rounds: {
        type: Array,
        required: true
    },
    currentRound: {
        type: Object,
        required: true
    },
    started: {
        type: Boolean,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    skips: {
        type: Number,
        required: true
    }
})

export default mongoose.model("RankedMatches", RankedMatches)