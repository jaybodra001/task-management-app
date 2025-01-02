import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js"
import taskRoutes from "./routes/task.route.js"
import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/db.js'


const app = express()
const PORT = ENV_VARS.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)

app.use("/api/v1/user",taskRoutes)

app.listen(5000, () =>{
    console.log("Server started at http://localhost:"+PORT)
    connectDB()
})