import express from "express"
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("hello user you are authenticated")
})

//UPDATE

//DELETE

//GET

//GET ALL


export default router