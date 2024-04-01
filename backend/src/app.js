import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import booksRoute from "./router/book.route.js"
const app = express()

app.use(express.static("public"))

app.use(express.json({ limit: "160kb" }))
app.use(express.urlencoded({ extended: false, limit: "160kb" }))
app.use(cors())
app.use(cookieParser())

app.use("/api/v1/books", booksRoute)


export default app