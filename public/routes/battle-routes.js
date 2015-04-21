var base = '/battle',
       express = require('express'),
       router = express.Router(),
       playerConnection = require('../connections/playerconnection');
       
router.get('/getplayerbattlestate\?/:playerName', function(req, res) {
        var playerName = req.query.playerName;
        playerConnection.getPlayer(playerName, function(player) {
            if(player) {
                res.send({
                    battleState: { inBattle: player.inBattle || false }
                });
            }
            res.end();
        });
});