import express from 'express'
import cookieParser from 'cookie-parser'
import router from './routes/auth.routes.js'
import foodRouter from "./routes/food.routes.js"
import cors from 'cors'
const app = express()

app.use(cookieParser())
app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ limit: '300mb', extended: true }));

app.get("/", (req, res) => {
    res.send("hii I am kamran")
})

app.use(cors({
    origin: "https://vercel-frontend-uneh.vercel.app",
    credentials: true
}))

app.use("/api/auth",router)
app.use("/api/food",foodRouter)

export default app