import express from 'express'
import multer  from 'multer'
import connectDB  from './config/db.js'
import {insertAuthor, insertBooksAndMagazenesData} from './controllers/insertCSVdata.js'
import {getTotalData} from './controllers/totalData.js'
import {getDataByISBN, getDataByEmail, getTotalSortedData} from './controllers/getData.js'

connectDB()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express()

app.use(express.json())

const cpUpload = upload.fields([{ name: 'author'}, { name: 'books'}, {name: 'magazenes'}])
app.get('/', (req, res) => {
    res.send("hello world")
})

//  pushing CSV files data
app.post('/api/upload', cpUpload, function (req, res, next) {

    const authors = req.files['author'][0].buffer.toString()
    const books = req.files['books'][0].buffer.toString()
    const magazenes = req.files['magazenes'][0].buffer.toString()

    insertAuthor(authors)
    insertBooksAndMagazenesData(books, magazenes)
    res.send('recieved')
  })

  // getting all the data
  app.get('/api/totalData', (req, res) => {
    getTotalData(req, res)
  })

  app.get('/api/sortedData', (req, res) => {
    getTotalSortedData(req, res)
  })

  app.get('/api/getByISBN/:isbn', (req, res) => {
    // console.log(req.params.isbn)
    getDataByISBN(req, res)
  })

  app.get('/api/getByEmail/:email', (req, res) => {
    getDataByEmail(req, res)
  })

  // step 1
const PORT = process.env.PORT || 6600;
app.listen(PORT, () => {
    console.log('App Running ....')
})

// step 2
if(process.env.NODE_ENV === "production") {
  app.use(express.static('frontend/build'))
}
