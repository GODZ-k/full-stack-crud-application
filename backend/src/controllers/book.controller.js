import { Book } from "../models/books.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { createBooktype, deleteBookType, updateBookType } from "../utils/types.js"




// create a new book

const createBook = asyncHandler(async(req, res) => {

    const inputData = req.body // recived data from user

    // console.log(inputData)

    const parsepayLoad = createBooktype.safeParse(inputData) // parse to the zod input validation and return it from response in boolean with data

    // console.log(parsepayLoad.data, parsepayLoad.error)

    if (!parsepayLoad.success) {
        return res.status(422).json(
            new ApiResponse(422, {}, "Please enter valid input")
        )
    }

    const localFilePath = req.file ? req.file.path : null // reciving right file path

    if (!localFilePath) {
        throw new ApiError(400, "Missing local file path")
    }

    // console.log(localFilePath)

    const bookImage = await uploadOnCloudinary(localFilePath) // upload on cloudinary

    if (!bookImage || !bookImage.url) {
        throw new ApiError(400, "missing image link from cloudinary")
    }
    const { title, description, year } = parsepayLoad.data // destructure zod payload data

    const book = await Book.create({ title, description, year, image: bookImage.url }) // creating book object

    return res.status(201).json(
        new ApiResponse(201, book, "Book created successfully")
    )

})


// get all books data

const getAllBooks = asyncHandler(async(req, res) => {

    const books = await Book.find({})

    if (!books.length) {
        return res.status(422).json(422, books, "No books found")

    }

    return res.status(200).json(
        new ApiResponse(200, books, "Books found"))
})



// update book deatil

const updateBook = asyncHandler(async(req, res) => {
    const bookId = req.params.id
    const updateableData = req.body

    // console.log(updateableData)

    const parsePayLoad = updateBookType.safeParse(updateableData)

    // console.log(parsePayLoad)

    if (!parsePayLoad) {
        return res.status(422).json(
            new ApiResponse(422, {}, "Please enter valid inputs")
        )
    }
    const imageLocalPath = req.file ? req.file.path : null

    const image = await uploadOnCloudinary(imageLocalPath)

    const { title, description, year } = parsePayLoad.data

    // console.log(id, title, description, year)
    console.log("start")

    /*

    const exitingBook = await Book.findById(id)

    const book = await Book.findByIdAndUpdate(id, {
            $set: {
                title,
                description,
                year,
                image: image ? image.url : exitingBook.image,
            }
        }, { new: true })

    */

    let updatedFields = {
        title,
        description,
        year,
    };

    if (image) {
        updatedFields.image = image.url;
    }

    const book = await Book.findByIdAndUpdate(bookId, {
        $set: updatedFields,
    }, { new: true });


    return res.status(200).json(
        new ApiResponse(200, book, "Successfully uploaded")
    )
})


// delete book

const deleteBook = asyncHandler(async(req, res) => {

    const deletedBook = req.body

    console.log(deletedBook)

    const parsePayLoad = deleteBookType.safeParse(deletedBook)

    if (!parsePayLoad) {
        return new ApiResponse(400, {}, "Invalid book id")
    }

    const { id } = parsePayLoad.data

    const deleted = await Book.findByIdAndDelete(id)

    if (!deleted) {
        return res.status(422).json(
            new ApiResponse(422, {}, "Book not found")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, deleted, "Book deleted successfully")
    )

})

export {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}