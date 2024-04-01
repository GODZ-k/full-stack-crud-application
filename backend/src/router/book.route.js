import { Router } from "express";
import upload from "../middleware/multer.middleware.js"
import {
    createBook,
    deleteBook,
    getAllBooks,
    updateBook
} from "../controllers/book.controller.js";
const router = Router()



router.route("").get(getAllBooks) // read
router.route("/create").post(upload.single("image"), createBook) // create
router.route("/update/:id").patch(upload.single("image"), updateBook) // update
router.route("/delete").post(deleteBook) // delete



export default router