import mongoose from 'mongoose'

const URI = 'mongodb+srv://sahil:sahil78623@raftlabs.hgrwx.mongodb.net/bookStore?retryWrites=true&w=majority'
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(URI)
            console.log(`MongoDB connected : ${conn.connection.host}`)
        } catch (error) {
            console.log(`Error : ${error.message}`)
            process.exit(1)
        }
    }

    export default connectDB