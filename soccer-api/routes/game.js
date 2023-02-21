import express from "express"
import { startMatch, verifyAnswer } from "../controllers/gameController.js";


const router = express.Router();

router.get("/", startMatch)

router.get("/verify", verifyAnswer)

//DELETE

//GET

//GET ALL


export default router