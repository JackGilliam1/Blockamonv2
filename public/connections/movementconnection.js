var gameVariables = require('../settings/gamevariables'),
      playerDimensions = require('../settings/objectDimensions').player,
      playerconnection = require('./playerconnection'),
      positionUpdater = {
        up: function(player) {
            var newY = player.position.y;
            newY -= gameVariables.verticalSpeed;
            if(newY < gameVariables.minY) {
                newY = (gameVariables.maxY - playerDimensions.height);
            }
            player.position.y = newY;
        },
        down: function(player) {
            var newY = player.position.y;
            newY += gameVariables.verticalSpeed;
            if((newY + playerDimensions.height) > gameVariables.maxY) {
                newY = gameVariables.minY;
            }
            player.position.y = newY;
        },
        left: function(player) {
            var newX = player.position.x;
            newX -= gameVariables.horizontalSpeed;
            if(newX < gameVariables.minX) {
                newX = (gameVariables.maxX - playerDimensions.width);
            }
            player.position.x = newX;
        },
        right: function(player) {
            var newX = player.position.x;
            newX += gameVariables.horizontalSpeed;
            if((newX + playerDimensions.width) > gameVariables.maxX) {
                newX = gameVariables.minX;
            }
            player.position.x = newX;
        },
        leftup: function(player) {
            this.left(player);
            this.up(player);
        },
        upleft: function(player) {
            this.up(player);
            this.left(player);
        },
        rightup: function(player) {
            this.right(player);
            this.up(player);
        },
        upright: function(player) {
            this.up(player);
            this.right(player);
        },
        downleft: function(player) {
            this.down(player);
            this.left(player);
        },
        leftdown: function(player) {
           this.left(player);
           this.down(player);
        },
        downright: function(player) {
            this.down(player);
            this.right(player);
        },
        rightdown: function(player) {
            this.right(player);
            this.down(player);
        }
};


module.exports = {
    updatePosition: function(direction, playerName, positionUpdated) {
        playerconnection.getPlayer(playerName, function(player) {
            if(player) {
                if(positionUpdater[direction]) {
                    positionUpdater[direction](player);
                    player.position.direction = direction;
                    playerconnection.updatePlayer(player, function(player) {
                        positionUpdated(player);
                    });
                }
                else {
                    positionUpdated(player);
                }
                return;
            }
            positionUpdated(undefined);
        });
    },
    getPosition: function(playerName, positionLoaded) {
        playerconnection.getPlayer(playerName, function(player) {
            if(player) {
                positionLoaded(player.position);
                return;
            }
            positionLoaded(undefined);
        });
    }
};