import express from "express"
import { getTopPlayers, startRankedMatch } from "../controllers/rankedMatchController.js";
import { isUserLoggedIn } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/",isUserLoggedIn, startRankedMatch)
router.get("/getTopPlayers", getTopPlayers)
//router.get("/skip", skipRound)


export default router