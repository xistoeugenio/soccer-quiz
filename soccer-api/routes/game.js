import express from "express"
import { startMatch, verifyAnswer, startRankedMatch } from "../controllers/gameController.js";


const router = express.Router();

router.get("/", startMatch)

router.get("/verify", verifyAnswer)

router.get("/ranked", startRankedMatch)
//DELETE

//GET

//GET ALL


export default router