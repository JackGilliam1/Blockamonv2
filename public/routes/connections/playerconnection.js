var Player = require('./schemas/playerModel');
      
module.exports = {
    player: undefined,
    getPlayer: function(playerName, playerLoaded) {
        var self = this;
        if(self.player && self.player.name === playerName) {
            playerLoaded(self.player);
            return;
        }
        Player.findOne()
            .where('name').equals(playerName || 'testPlayer')
            .exec(function(err, player) {
                if(err) {
                    playerLoaded(undefined);
                    return console.error(err);
                }
                if(!player) {
                    console.log('player not found with name ' + playerName);
                    player = new Player({ name: playerName, position: { x: 0, y: 0, direction: 'left' } });
                    player.save(function(err, savedPlayer) {
                        self.player =  player;
                        self.playerLoaded = true;
                        playerLoaded(self.player);
                    });
                    return;
                }
                self.player =  player;
                self.playerLoaded = true;
                playerLoaded(self.player);
            });
    },
    updatePlayer: function(player, playerUpdated) {
        var self = this;
        Player.findByIdAndUpdate(player.id,
                  player,
                  undefined,
                  function(err, updatedPlayer) {
                      if(err) {
                          playerUpdated(undefined);
                          return console.log(err);
                      }
                      self.player = updatedPlayer;
                      playerUpdated(updatedPlayer);
                  });
    },
    updatePlayerName: function(oldName, newName, playerUpdated) {
        var self = this;
        this.getPlayer(oldName, function(player) {
            player.name = newName;
            Player.findByIdAndUpdate(player.id,
                player,
                undefined, 
                function(err, savedPlayer) {
                    if(err) {
                        playerUpdated(savedPlayer);
                        return console.log(err);
                    }
                    self.player = savedPlayer;
                    playerSaved(savedPlayer);
                });
        });
    }
};