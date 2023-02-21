import express from "express"
import { verifyAnswer } from "../controllers/gameController.js";
import { skipRound, startRankedMatch } from "../controllers/rankedMatchController.js";

const router = express.Router();

router.get("/", startRankedMatch)
router.get("/verify", verifyAnswer)
router.get("/skip", skipRound)


export default router