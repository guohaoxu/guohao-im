var crypto = require('crypto'),
    User = require('../models/user.js')

module.exports = function (app) {

     function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.json({
                "code": "0",
                "msg": "未登录"
            })
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.json({
                "code": "0",
                "msg": "已登录"
            })
        }
        next();
    }

    //Page routes
    app.get('/', function (req, res) {
        //
    })

    app.post('/login', checkNotLogin, function (req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex')

        User.get(req.body.username, function (err, docs) {
            if (!docs.length) {
                req.flash('error', '用户名不存在！')
                return res.redirect('/login')
            }
            if (docs[0].password != password) {
                req.flash('error', '密码错误！')
                return res.redirect('/login')
            }
            req.session.user = docs[0];
            req.flash('success', '登录成功!')
            res.redirect('/')
        })
    })

//    app.get('/logout', checkLogin, function (req, res) {
//        req.session.user = null
//        req.flash('success', '登出成功！')
//        res.redirect('/')
//    });
//
//    app.post('/reg', checkNotLogin, function (req, res) {
//        var password = req.body.password,
//            password_re = req.body['password-repeat'];
//        if (req.body.username.length < 2 || req.body.password.length < 2 || req.body['password-repeat'].length < 2) {
//            req.flash('error', '缺少输入！');
//            return res.redirect('/reg');
//        }
//        if (password_re != password) {
//            req.flash('error', '两次输入的密码不一致！');
//            return res.redirect('/reg');
//        }
//        var md5 = crypto.createHash('md5'),
//            newUser = new User({
//                username: req.body.username,
//                password: md5.update(req.body.password).digest('hex')
//            })
//        User.get(newUser.username, function (err, docs) {
//            if (err) {
//                req.flash('error', err)
//                return res.redirect('/reg')
//            }
//            if (docs.length) {
//                req.flash('error', '用户名已存在！')
//                return res.redirect('/reg')
//            }
//            newUser.save(function (err, result) {
//                if (err) {
//                    req.flash('error', err);
//                    return res.redirect('/reg')
//                }
//                req.session.user = newUser
//                req.flash('success', '注册成功!请完善个人信息!')
//                res.redirect('/set')
//            })
//        })
//    })






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

}
