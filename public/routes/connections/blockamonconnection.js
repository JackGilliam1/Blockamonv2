var Blockamon = require('./schemas/blockamonModel');
       
module.exports = {
   loadBlockamon: function(playerName, blockamonLoaded) {
        Blockamon.find()
            .where('owner').equals(playerName)
            .exec(function(err, blockamon) {
               if(err || !blockamon || blockamon.length === 0) {
                    blockamonLoaded([]);
                    return console.error(err);
               }
               blockamonLoaded(blockamon);
            });
   },
    loadBlockamon: function(blockamonId, blockamonLoaded) {
       Blockamon.findById(blockamon.id, function(err, blockamon) {
           if(err) {
               blockamonLoaded(undefined);
               return console.log(err);
           }
           blockamonLoaded(blockamon);
       });
    },
   saveBlockamon: function(blockamon, blockamonSaved) {
        Blockamon.saveBlockamon(blockamon, blockamonSaved);
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