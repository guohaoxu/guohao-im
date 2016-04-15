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
    this.findOne({
        //name: new RegExp(name, 'i')
        name: name
    }, cb)
}

var User = mongoose.model('User', userSchema)

module.exports = User
