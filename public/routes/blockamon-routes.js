var base = '/blockamon',
      express = require('express'),
      router = express.Router(),
      playerConnection = require('./connections/playerconnection'),
      objectDimensions = require('./settings/objectDimensions'),
      gameVariables = require('./settings/gamevariables'),
      playerDimensions = objectDimensions.player,
      blockamonDimensions = objectDimensions.blockamon,
      lastBlockamonPosition;
      
router.get('/getactiveblockamonposition\?:playerName',
        function(req, res, next) {
            var playerName = req.query.playerName;
                playerConnection.getPlayer(playerName, function(player) {
                    req.query.playerPosition = player.position;
                    next();
                });
        },
        function(req, res, next) {
            var playerPosition = req.query.playerPosition,
                  newX = playerPosition.x,
                  newY = playerPosition.y,
                  zIndex = playerDimensions.zIndex,
                  minX = gameVariables.minX,
                  minY = gameVariables.minY,
                  maxX = gameVariables.maxX,
                  maxY = gameVariables.maxY,
                  rotation,
                  direction = 'right';
            
           if(playerPosition.direction.indexOf('up') != -1) {
                newX -= (blockamonDimensions.width + playerDimensions.width) / 2;
                newY += blockamonDimensions.height - 10;
                zIndex = playerDimensions.zIndex + 1;
            }
            else if(playerPosition.direction.indexOf('down') != -1) {
                newX -= (blockamonDimensions.width + playerDimensions.width) / 2;
                newY -= blockamonDimensions.height + 5;
                zIndex = playerDimensions.zIndex - 1;
            }
            else if(playerPosition.direction.indexOf('right') != -1) {
                newX -= blockamonDimensions.width + playerDimensions.width;
            }
            
            if(newY < minY || newX < minX) {
                newX = playerPosition.x;
                newY = playerPosition.y;
                zIndex = playerDimensions.zIndex;
            }
            
            if((newY + blockamonDimensions.height) >= maxY
                || (newX + blockamonDimensions.width + playerDimensions.width) >= maxX) {
                newX = playerPosition.x - (blockamonDimensions.width + playerDimensions.width);
                newY = playerPosition.y;
                zIndex = playerDimensions.zIndex;
            }
            
            if(lastBlockamonPosition) {
                var lastY = lastBlockamonPosition.position.y + blockamonDimensions.height/2,
                      lastX = lastBlockamonPosition.position.x + blockamonDimensions.width,
                      nextX = playerPosition.x + playerDimensions.width/2,
                      nextY = playerPosition.y + playerDimensions.height/2;
                      
                rotation = Math.atan2(nextX - lastX, -(nextY - lastY)) * (180/Math.PI);
                      
                if((nextX > lastX && nextY > lastY) || (nextX > lastX && nextY < lastY)) {
                    //top left
                    //bottom left
                    direction = 'left';
                }
                else if((nextX < lastX && nextY > lastY) || (nextX < lastX && nextY < lastY)) {
                    //top right
                    //bottom right
                    direction = 'right';
                }
            }
            else {
                rotation = 0;
            }
            
            res.send(lastBlockamonPosition = {
                position: {
                   x: newX,
                   y: newY,
                   zIndex: zIndex,
                   direction: direction || 'right',
                   rotation: rotation
                }
            });
            res.end();
        });
      
router.get('/getstarterblockamon\?:playerName', function(req, res) {
    
});
    
module.exports = router;
      