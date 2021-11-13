import express from 'express'
import multer  from 'multer'
import connectDB  from './config/db.js'
import {insertAuthor, insertBooksAndMagazenesData} from './controllers/insertCSVdata.js'
import {getTotalData} from './controllers/totalData.js'

connectDB()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express()

app.use(express.json())

const cpUpload = upload.fields([{ name: 'author'}, { name: 'books'}, {name: 'magazenes'}])
app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/api/upload', cpUpload, function (req, res, next) {

    const authors = req.files['author'][0].buffer.toString()
    const books = req.files['books'][0].buffer.toString()
    const magazenes = req.files['magazenes'][0].buffer.toString()

    insertAuthor(authors)
    insertBooksAndMagazenesData(books, magazenes)
    // console.log(booksAndMagazenesData)
    res.send('recieved')
  })

  app.get('/api/totalData', (req, res) => {
      getTotalData(req, res)
  })

const PORT = 6000;
app.listen(3000, () => {
    console.log('App Running ....')
})
