
var base = '/movement',
      express = require('express'),
      router = express.Router(),
      keyMappings = require('../settings/keymappings'),
      movementConnection = require('../connections/movementconnection');
      
router.post('/buttonpushed', function(req, res) {
    var keysPressed = req.body.keys,
          playerName = req.body.playerName,
          keyStr,
          direction;
    
    if(keysPressed.length > 1) {
        var directions = [];
        for(var key in keysPressed) {
            keyStr = String.fromCharCode(keysPressed[key]);
            direction = keyMappings[keyStr.toLowerCase()];
            if(direction) {
                directions.push(direction);
            }
        }
        direction = directions[0] + directions[1];
    }
    else {
          keyStr = String.fromCharCode(keysPressed[0]);
          direction = keyMappings[keyStr.toLowerCase()];
    }
    if(direction) {
        movementConnection.updatePosition(direction, playerName, function() {
            res.redirect('/player/getplayer?playerName=' + playerName);
            res.end();
        });
    }
    else {
        res.redirect('/player/getplayer?playerName=' + playerName);
        res.end();
    }
});

module.exports = router;