var base = '/player',
      express = require('express'),
      router = express.Router(),
      playerConnection = require('./connections/playerconnection');

router.get('/getplayerposition\?:playerName', function(req, res) {
    var name = req.query.playerName;
    playerConnection.getPlayer(name, function(player) {
        if(player) {
            res.send({
                position: { x: player.position.x, y: player.position.y, direction: player.position.direction }
            });
        }
        res.end();
    });
});

router.post('/updateplayername', function(req, res) {
    var oldPlayerName = req.body.oldName,
          newPlayerName = req.body.newName;
    playerConnection
        .updatePlayerName(oldPlayerName, newPlayerName, function(player) {
            res.redirect(base + '/getplayer?playerName=' + player.name);
            res.end();
        });
});
      
router.get('/getplayer\?:playerName', function(req, res) {
    var name = req.query.playerName;
    playerConnection.getPlayer(name, function(player) {
        if(player) {
            res.send({
                name: player.name
            });
        }
        res.end();
    });
});
      
module.exports = router;