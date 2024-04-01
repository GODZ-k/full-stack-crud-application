import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});


const uploadOnCloudinary = async(LocalFilepath) => {
    try {

        if (!LocalFilepath) return null

        const response = await cloudinary.uploader.upload(LocalFilepath, {
            resource_type: "auto"
        })

        // response when file uploaded successfully
        // console.log("file uploaded successfully", response)


        // unlink file from localstorage when successfully uploaded
        fs.unlinkSync(LocalFilepath)

        return response

    } catch (error) {

        // unlink file when uploading failed
        fs.unlinkSync(LocalFilepath)

        console.log("File upload failed", error)

        return null
    }
}


export { uploadOnCloudinary }