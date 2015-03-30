define('gamearea', ['react', 'jquery', 'store', './player', './blockamon'], function(React, $, store, Player, Blockamon) {
    
    var Index;
 
    Index = React.createClass({
        getInitialState: function() {
            var playerNameStore = store.get('playerName');
            var playerName = playerNameStore ? playerNameStore.name : 'test';
            return {
               player:  { name: playerName }
            };
        },
        keysPressed: {},
        doKeyDown: function(e) {
            e.preventDefault();
            this.keysPressed[e.keyCode] = true;
            this.sendKeys(Object.keys(this.keysPressed));
        },
        doKeyUp: function(e) {
            delete this.keysPressed[e.keyCode];
            this.sendKeys(Object.keys(this.keysPressed));
        },
        sendKeys: function(keys) {
            var self = this;
            if(keys.length > 0) {
                $.ajax({
                    url: '/movement/buttonpushed',
                    type: 'POST',
                    data: {
                        keys: keys,
                        playerName: this.state.player.name
                    },
                    success: function(player) {
                        self.setState({
                            player: player
                        });
                        self.refs.activeBlockamon.playerMoved();
                    }
                });
            }
        },
        componentDidMount: function() {
           $(document).keydown(this.doKeyDown);
           $(document).keyup(this.doKeyUp);
        },
        componentWillMount: function() {
            var self = this;
            var playerName = this.state.player.name;
            $.ajax({
                url: '/player/getplayer',
                type: 'GET',
                data: { playerName: playerName },
                success: function(player) {
                    self.setState({
                        player: player
                    });
                }
            });
        },
        componentDidUpdate: function() {
            React.findDOMNode(this.refs.gameArea).focus();
        },
        playerNameChanged: function(oldName, newName) {
            var self = this;
            $.ajax({
                url: '/player/updateplayername',
                type: 'POST',
                data: { oldName: oldName, newName: newName },
                success: function(player) {
                    store.set('playerName', { name: player.name })
                    self.setState({
                        player: player
                    });
                }
            });
        },
        render: function() {
            var playerName = this.state.player.name;
            
            return (
                <div id="content">
                    <div id="gameArea"
                        ref="gameArea"
                        className="gamearea">
                        <Player ref="player" name={playerName}
                            playerNameChanged={this.playerNameChanged} />
                        <Blockamon ref="activeBlockamon" elementType={"bug"} playerName={playerName} />
                    </div>
                </div>
            );
        }
    });
    
    React.render(<Index />, $('body')[0]);
    
    return Index;
});