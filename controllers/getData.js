import Data from '../models/Data.js'

export const getDataByISBN = async(req, res) => {
    try {
        const query = await Data.findOne({ isbn: req.params.isbn});
        console.log(query)
        res.send(query)
    } catch (error) {
        res.send(`error: ${error}`)
    }
}

export const getDataByEmail = async(req, res) => {
    try {
        const query = await Data.find({author: { $all: [`${req.params.email}`]}})
        res.send(query)
    } catch (error) {
        res.send(`error: ${error}`)
    }
}

 export const getTotalSortedData = async(req, res) => {
    try {
        const query = await Data.find().sort( { "title": 1 } )
            // console.log(query)
        res.send(query)
    } catch (error) {
        res.send(`error: ${error}`)
    }
}