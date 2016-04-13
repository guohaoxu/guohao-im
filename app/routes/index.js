var settings = require('../settings'),
    mongoose = require('mongoose')

mongoose.connect(settings.dbUrl)

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: String
})

var BookModel = mongoose.model('Book', Book)

module.exports = function (app) {

    //Page routes
    app.get('/', function (req, res) {
        //
    })

    //RESTful API routes
    app.get('/api', function (req, res) {
        res.send('API is running.')
    })

    app.get('/api/books', function (req, res) {
        BookModel.find(function (err, books) {
            if (err) return next(err)
            res.send(books)
        })
    })

    app.post('/api/books', function (req, res) {
        var book = new BookModel({
            title: req.body.title,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            keywords: req.body.keywords
        })
        book.save(function (err) {
            if (err) return next(err)
            res.send(book)
        })
    })

    app.get('/api/books/:id', function (req, res) {
        BookModel.findById(req.params.id, function (err, book) {
            if (err) return next(err)
            res.send(book)
        })
    })

    app.put('/api/books/:id', function (req, res) {
        BookModel.findById(req.params.id, function (err, book) {
            book.title = req.body.title
            book.author = req.body.author
            book.releaseDate = req.boyd.releaseDate
            book.keywords = req.body.keywords
            book.save(function (err) {
                if (err) return next(err)
                res.send(book)
            })
        })
    })

    app.del('/api/books/:id', function (req, res) {
        BookModel.findById(req.params.id, function (err, book) {
            book.remove(function (err) {
                if (err) return next(err)
                res.send('')
            })
        })
    })

    app.all('*', function (req, res) {
        res.end('404')
    })

}
