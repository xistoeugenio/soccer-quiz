import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser"
import playersRoute from "./routes/players.js"
import usersRoute from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import gameRoute from "./routes/game.js"
import rankedMatchRoute from "./routes/rankedMatch.js"

const app = express()
dotenv.config()

const conect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb")
    } catch (err) {
        throw err
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb has been disconected")
})

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors({
    origin: ["https://socciz.online", "http://localhost:3000"],
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/players", playersRoute)
app.use("/api/users", usersRoute)
app.use("/api/game", gameRoute)
app.use("/api/ranked", rankedMatchRoute)
app.use("/api", authRoutes)


/*this is a middleware that handle the error without having to write "res.status(500).json(err)" in the index.js */
app.use((err, req, res, next) => {
    const errorstatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorstatus).json({
        sucess: false,
        status: errorstatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(process.env.PORT || 8800, () => {
    conect()
    console.log("server is running on http://localhost:8800")
})