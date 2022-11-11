import express from "express"
import { singlePlayer, verify } from "../controllers/gameController.js";


const router = express.Router();

router.get("/", singlePlayer)

router.post("/:id", verify)
//DELETE

//GET

//GET ALL


export default router