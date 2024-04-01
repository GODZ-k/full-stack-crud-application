import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./db/Connection.js";
const port = process.env.PORT

dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {
        app.listen(port || 8000, () => {
            console.log(`Listening on ${port}`)
        })
    })
    .catch((err) => {
        console.log(`Error to listing port ${port} : ${err}`)
    })