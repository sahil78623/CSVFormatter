import Data from '../models/Data.js'

export const getTotalData = async(req, res) => {
    try{
        const totalData = await Data.find({})
        res.send(totalData)
        // console.log(`totalData: ${totalData}`)
    }
    catch(error) {
        res.send(`error: ${error}`)
    }
}