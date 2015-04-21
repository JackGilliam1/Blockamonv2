var types = require('../settings/blockamontypes'),
       Blockamon = require('../connections/schemas/blockamonModel'),
       blockamonConnection = require('../connections/blockamonconnection'),
       healthBuffer = 100,
       healthBase = 50,
       attackBuffer = 10,
       attackBase = 5,
       defenseBuffer = 10,
       defenseBase = 5;

module.exports = {
    getNew: function(baseLevel, playerName, blockamonCreated) {
        var type = types.getRandomType(),
               health = Math.floor(Math.random() * healthBuffer) + healthBase,
               attack = Math.floor(Math.random() * attackBuffer) + attackBase,
               defense = Math.floor(Math.random() * defenseBuffer) + defenseBase,
               level = Math.floor((Math.random() * ((baseLevel + 5) - baseLevel)) + baseLevel);
               
        new Blockamon({
           name: type,
           owner: playerName,
           stats: {
                        elementType: type,
                        level: level,
                        totalHealth: health,
                        currentHealth: health,
                        attack: attack,
                        defense: defense
                     },
            moveset: {
                one: 'scratch',
                two: undefined,
                three: undefined,
                four: undefined
            }
        })
        .save(function(err, savedBlockamon) {
                if(err) {
                    return console.error(err);
                }
                blockamonConnection.loadBlockamon(savedBlockamon.id, blockamonCreated);
        });
    }
};