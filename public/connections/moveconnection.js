var Move = require('./schema/moveModel');

module.exports = {
    getMoveByName: function(moveName, moveFound) {
        Move
            .findOne(moveName, function(err, move) {
               if(err) {
                    moveFound(undefined);
                    return console.error(err);
               }
               moveFound(move);
            });
    }
};
