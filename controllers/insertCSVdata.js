import Author  from '../models/Author.js'
import Data from '../models/Data.js'

export const insertAuthor = (authors) => {
    let authorData = []
    let rows = authors.split("\n"); // SPLIT ROWS
    for(let i = 1  ; i < rows.length ; i++) {
        let columns = rows[i].split(","); //SPLIT COLUMNS
        authorData.push({
            'email': columns[0], 
            'firstname': columns[1], 
            'lastname': columns[2]
        })
    }

    const inserAuthors = async () => {
        try {
            await Author.deleteMany()
            await Author.insertMany(authorData)
            console.log('Authors Inserted')
            process.exit()
        }
        catch(error) {
            console.log(`error: ${error}`)
            process.exit(1)
        }
    }
    inserAuthors()
}

const util = (data, lastRow) => {
    let result = []
    let rows = data.split("\n"); // SPLIT ROWS
    for(let i = 1  ; i < rows.length ; i++) {
        let columns = rows[i].split(","); //SPLIT COLUMNS
        let authors = []
        let lastRowData = ""

        //combining all the authors
        let j = 2;
        for(; j < columns.length - 1 ; j++) {
            let temp = columns[j].split(" ")
            if(temp.length > 1)
                break;
            authors.push(columns[j])
        }

        for(let k = j ; k < columns.length; k++ ) {  
            
            lastRowData += columns[k]
        }
        result.push({
            'title': columns[0], 
            'isbn': columns[1], 
            'authors': authors,
            [lastRow]: lastRowData
        })
    }
    return result
}
export const insertBooksAndMagazenesData = (books, magazenes) => {

    let booksData = util(books, 'description')
    let magazenesData = util(magazenes, 'publishedAt')
    let booksAndMagazenesData = [...booksData, ...magazenesData]

    // console.log('magazene data')
    console.log(booksAndMagazenesData)

    const inserData = async () => {
        try {
            await Data.deleteMany()
            await Data.insertMany(booksAndMagazenesData)
            console.log('Data Inserted')
            process.exit()
        }
        catch(error) {
            console.log(`error: ${error}`)
            process.exit(1)
        }
    }
    inserData()

}