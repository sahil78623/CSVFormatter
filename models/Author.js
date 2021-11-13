import mongoose from 'mongoose'

const authorSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
}, {
    timestamp: true
})

const Author = mongoose.model('Author', authorSchema)

export default Author