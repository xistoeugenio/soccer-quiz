import express from "express";
import { createPlayer, deletePlayer, getAllPlayer, getPlayer, updatePlayer } from "../controllers/playerController.js";
import Player from "../models/Player.js";

const router = express.Router();


//CREATE

router.post("/", createPlayer)

//UPDATE

router.put("/:id", updatePlayer)


//DELETE

router.delete("/:id", deletePlayer)

//GET

router.get("/:id", getPlayer)

//GET ALL

router.get("/", getAllPlayer)


export default router