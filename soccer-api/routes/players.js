import express from "express";
import { createPlayer, deletePlayer, getAllPlayer, getPlayer, updatePlayer } from "../controllers/playerController.js";
import Player from "../models/Player.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


//CREATE

router.post("/", verifyAdmin, createPlayer)

//UPDATE

router.put("/:id", verifyAdmin, updatePlayer)


//DELETE

router.delete("/:id", verifyAdmin, deletePlayer)

//GET

router.get("/:id", getPlayer)

//GET ALL

router.get("/", getAllPlayer)


export default router