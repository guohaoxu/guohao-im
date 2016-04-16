var mongoose = require('mongoose'),
    settings = require('../settings.js')

//mongoose.connect(settings.dbUrl)

var messSchema = new mongoose.Schema({
    sayer: String,
    toer: String,
    txt: String,
    date: {
        type: Date,
        default: Date.now
    }
})

//Instance methods
messSchema.methods.speak = function () {
    console.log(this.sayer)
}

//Statics methods
messSchema.statics.getFive = function (sayer, toer, cb) {
    this.find({
        sayer: sayer,
        toer: toer
    }, cb)
}

var Message = mongoose.model('Message', messSchema)

module.exports = Message