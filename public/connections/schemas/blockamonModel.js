var mongoose = require('mongoose'),
      blockamonSchema = new mongoose.Schema({
        owner: String,
        name: String,
        stats: {
                     elementType: String,
                     level: Number,
                     totalHealth: Number,
                     currentHealth: Number,
                     attack: Number,
                     defense: Number
                  },
        moveset: {
            one: { type: String, ref: 'Move'},
            two: { type: String, ref: 'Move' },
            three: { type: String, ref: 'Move' },
            four: { type: String, ref: 'Move' }
        }
      });
      
module.exports = mongoose.model('Blockamon', blockamonSchema);