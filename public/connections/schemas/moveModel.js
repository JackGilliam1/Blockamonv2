var mongoose = require('mongoose'),
       moveSchema = new mongoose.Schema({
           _id: String,
           type: String,
           base: Number
       });

module.exports = mongoose.model('Move', moveSchema);