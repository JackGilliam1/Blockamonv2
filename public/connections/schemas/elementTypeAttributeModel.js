var mongoose = require('mongoose'),
       elementTypeAttributeSchema = new mongoose.Schema({
           _id: String,
           strongAttack: [String],
           weakAttack: [String],
           strongDefense: [String],
           weakDefense: [String],
           immuneDefense: [String]
       });
       
module.exports = mongoose.model('ElementTypeAttribute', elementTypeAttributeSchema);