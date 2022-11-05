import Player from "../models/Player.js"

export const createPlayer = async (req, res, next) => {
    const newPlayer = new Player(req.body)

    try {
        const savedPlayer = await newPlayer.save()
        res.status(200).json(savedPlayer)
    } catch (err) {
        next(err)
    }
}


export const updatePlayer = async (req, res, next) => {

    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedPlayer)
    } catch (err) {
        next(err)
    }
}


export const deletePlayer = async (req, res, next) => {

    try {
        await Player.findByIdAndDelete(req.params.id)
        res.status(200).json("player has been deleted")
    } catch (err) {
        next(err)
    }
}


export const getPlayer = async (req, res, next) => {

    try {
        const player = await Player.findById(req.params.id)
        res.status(200).json(player)
    } catch (err) {
        next(err)
    }
}


export const getAllPlayer = async (req, res, next) => {

    try {
        const player = await Player.find()
        res.status(200).json(player)
    } catch (err) {
        next(err)
    }
}