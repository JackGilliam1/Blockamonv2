var Blockamon = require('./schemas/blockamonModel');
       
module.exports = {
   loadBlockamon: function(playerName, blockamonLoaded) {
        Blockamon.find({ owner: playerName }, function(err, blockamon) {
               if(err || !blockamon || blockamon.length === 0) {
                    blockamonLoaded([]);
                    return console.error(err);
               }
               blockamonLoaded(blockamon);
            });
   },
    loadBlockamon: function(blockamonId, blockamonLoaded) {
       Blockamon.findById(blockamonId, function(err, blockamon) {
           if(err) {
               blockamonLoaded(undefined);
               return console.error(err);
           }
           blockamonLoaded(blockamon);
       });
    },
   saveBlockamon: function(blockamon, blockamonSaved) {
        this.loadBlockamon(blockamon.id, function(loadedBlockamon) {
            var blockProp;
            for(blockProp in blockamon) {
                if(blockProp !== 'id') {
                    loadedBlockamon[blockProp] = blockamon[blockProp];
                }
            }
            loadedBlockamon.save(loadedBlockamon, function(err, saved) {
                if(err) {
                    console.error(err);
                }
                blockamonSaved(saved);
            });
        });
   },
    updateBlockamon: function(blockamon, blockamonUpdated) {
        blockamon.forEach(function(block) {
            Blockamon.loadBlockamon(block.id, function(loadedBlockamon) {
                var blockProp;
                for(blockProp in block) {
                    if(blockProp !== 'id') {
                        loadedBlockamon[blockProp] = block[blockProp];
                    }
                }
                Blockamon.findByIdAndUpdate(blockamon.id,
                    blockamon,
                    undefined,
                    function(err, saveBlockamon) {
                        if(err) {
                            return console.log(err);
                        }
                        blockamonUpdated(saveBlockamon);
                    });
            });
        });
    }
};