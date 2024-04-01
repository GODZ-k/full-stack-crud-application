import mongoose from "mongoose";

const url = process.env.DATABASE_URL

const connectDB = async() => {
    await mongoose.connect(`${url}/crudDB`)
        .then((res) => {
            console.log(`Database is connected on host : ${res.connection.host}`)
        })
        .catch((error) => {
            console.error(`Error connecting : ${error}`)
        })
}

export default connectDB