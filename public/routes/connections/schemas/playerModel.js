var mongoose = require('mongoose'),
      playerSchema = new mongoose.Schema({
        name: String,
        money: Number,
        position: { x: Number, y: Number, direction: String },
        ownedBlockamon: [mongoose.Schema.Types.ObjectId]
      });
      
module.exports = mongoose.model('Player', playerSchema);