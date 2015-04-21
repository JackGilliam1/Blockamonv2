var mongoose = require('mongoose'),
      playerSchema = new mongoose.Schema({
        name: String,
        money: Number,
        position: { x: Number, y: Number, direction: String },
        ownedBlockamon: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blockamon'}]
      });
      
module.exports = mongoose.model('Player', playerSchema);