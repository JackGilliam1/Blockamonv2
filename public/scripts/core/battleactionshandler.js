var ea = require('./event-aggregator');

module.exports = {
   onAttack: function() {
       console.log('attack');
       ea.trigger('battle:onAttack');
   },
   onItem: function() {
        console.log('item');
        ea.trigger('battle:onItem');
   },
   onRun: function() {
        console.log('run');
        ea.trigger('battle:onRun');
   }
};