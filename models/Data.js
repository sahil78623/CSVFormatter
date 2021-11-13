import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    author: {
        type: [String],
        required: true
    },
    publishedAt: {
        type: String,
    },
    description: {
        type: String,
    },
},
{
    timestamp: true
})

const Data = mongoose.model('Data', dataSchema)

export default Data