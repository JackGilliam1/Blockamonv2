var base = '/actions',
       express = require('express'),
       router = express.Router(),
       creator = require('blockamoncreator'),
       damageCalculator = require('./calculators/damagecalculator'),
       blockamonConnection = require('blockamonconnection');

router.post('/attack', function(req, res) {
        var attacker = req.body.attacker,
              defender = req.body.defender;
       
       res.end();
});

router.get('/getblockamonfor\?/:playerName', function(req, res) {
    var playerName = req.query.playerName;
    blockamonConnection.loadBlockamon(playerName, function(blockamon) {
        res.send(blockamon);
        res.end();
    });
});

router.post('/createstarter', function(req, res) {
    var playerName = req.body.playerName,
    blockamon = creator.getNew();
    blockamon.owner = playerName;
    blockamonConnection.saveBlockamon(blockamon, function() {
        res.redirect('/actions/getblockamon?playerName=' + playerName);
        res.end();
    });
});
       
module.exports = router;