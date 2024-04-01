import zod from "zod"


// create
const createBooktype = zod.object({
    title: zod.string(),
    description: zod.string(),
    year: zod.string().length(4)

})


// delete
const deleteBookType = zod.object({
    id: zod.string(),
})


// update
const updateBookType = zod.object({
    // id: zod.string(),
    title: zod.string(),
    description: zod.string(),
    year: zod.string().length(4)
})


export {
    createBooktype,
    updateBookType,
    deleteBookType
}