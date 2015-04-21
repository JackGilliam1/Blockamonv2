var Player = require('./schemas/playerModel'),
       blockamonCreator = require('../routes/blockamoncreator'),
       blockamonConnection = require('./blockamonconnection');
      
module.exports = {
    getPlayer: function(playerName, playerLoaded) {
        var self = this,
               playerName = playerName || 'test';
        Player.findOne()
            .where('name').equals(playerName)
            .populate('ownedBlockamon')
            .exec(function(err, player) {
                if(err) {
                    playerLoaded(undefined);
                    return console.error(err);
                }
                if(!player) {
                    console.log('player not found with name ' + playerName);
                    self.createPlayer(playerName, function(player) {
                        playerLoaded(player);
                    });
                    return;
                }
                playerLoaded(player);
            });
    },
    createPlayer: function(playerName, playerLoaded) {
        var self = this,
              player = new Player({
                                                name: playerName,
                                                position: { x: 0, y: 0, direction: 'left' },
                                                money: 0,
                                                ownedBlockamon: []
                                               });
        blockamonCreator.getNew(1, playerName, function(blockamon) {
            player.ownedBlockamon.push(blockamon.id);
            player.save(function(err, savedPlayer) {
                if(err) {
                    return console.error(err);
                }
                self.getPlayer(playerName, playerLoaded);
            });
        });
        return;
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
                      playerUpdated(updatedPlayer);
                  });
    },
    updatePlayerBlockamonOwner: function(playerName, playerBlockamon) {
        var i;
        for(i = 0; i < playerBlockamon.length; i++) {
            blockamonConnection.loadBlockamon(playerBlockamon[i],
                function(blockamonLoaded) {
                    blockamonLoaded.owner = playerName;
                    blockamonConnection.saveBlockamon(blockamonLoaded, function(err, blockamonSaved) {
                        if(err) {
                            console.log(err);
                        }
                    });
                });
        }
    },
    updatePlayerName: function(oldName, newName, playerUpdated) {
        var self = this;
        this.getPlayer(oldName, function(player) {
            player.name = newName;
            self.updatePlayerBlockamonOwner(newName, player.ownedBlockamon);
            Player.findByIdAndUpdate(player.id,
                player,
                undefined, 
                function(err, savedPlayer) {
                    if(err) {
                        playerUpdated(savedPlayer);
                        return console.log(err);
                    }
                    self.player = savedPlayer;
                    playerUpdated(savedPlayer);
                });
        });
    }
};