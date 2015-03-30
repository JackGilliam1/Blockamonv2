
var baseFolder = __dirname + '/public',
       mongoose = require('mongoose');
       
       mongoose.connect('mongodb://localhost/blockamon');
     
var express = require('express'),
      bodyParser = require('body-parser'),
      movementRoutes = require(baseFolder + '/routes/movement-routes'),
      playerRoutes = require(baseFolder + '/routes/player-routes'),
      blockamonRoutes = require(baseFolder + '/routes/blockamon-routes');

var server = express();

///Configure
server.use(express.static(baseFolder));
server.use(bodyParser.urlencoded({ extended: true }));

//Routes
server.use('/movement', movementRoutes);
server.use('/player', playerRoutes);
server.use('/blockamon', blockamonRoutes);

server.get('/', function(req, res) {
    res.sendFile(baseFolder + '/views/index.html');
});

//Start listening
var port = 10001;
server.listen(port, function() {
    console.log('listening to port ' + port);
});