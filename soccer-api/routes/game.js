import express from "express"
import { startMatch, verify } from "../controllers/gameController.js";


const router = express.Router();

router.get("/", startMatch)

router.post("/:id", verify)
//DELETE

//GET

//GET ALL


export default router