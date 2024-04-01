import mongoose from "mongoose";


const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
}, { timestamps: true })


const Book = mongoose.model("Book", bookSchema)

export { Book }