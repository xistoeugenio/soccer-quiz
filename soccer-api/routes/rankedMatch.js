import express from "express"
import { startRankedMatch } from "../controllers/rankedMatchController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyUser, startRankedMatch)
//router.get("/verify", verifyAnswer)
//router.get("/skip", skipRound)


export default router