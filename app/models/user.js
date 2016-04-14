var mongoose = require('mongoose'),
    settings = require('../settings.js')

mongoose.connect(settings.dbUrl)

var userSchema = new mongoose.Schema({
    name: String,
    password: String
})

//Instance methods
userSchema.methods.speak = function () {
    console.log(this.name)
}

//Statics methods
userSchema.statics.findByName = function (name, cb) {
    this.find({
        name: new RegExp(name, 'i')
    }, cb)
}


var User = mongoose.model('User', userSchema)

User.findByName('aa', function (err, users) {
    //console.log(users)
})

module.exports = User