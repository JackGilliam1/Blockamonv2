require('main.scss');
require('grass.scss');
define('gamearea', [
     'react',
     'jquery',
     'store',
     './player',
     './blockamon',
     './grass',
     './battlebubble',
     './event-aggregator'
 ],
 function(React, $, store, Player, Blockamon, Grass, BattleBubble, ea) {
     
    var Index = React.createClass({
        getInitialState: function() {
            var playerNameStore = store.get('playerName');
            var playerName = playerNameStore ? playerNameStore.name : 'test';
            return {
               player:  { name: playerName },
               battleState: { inBattle: false }
            };
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
            ea.addListener('playerMoved', self.playerMoved);
        },
        playerMoved: function(player) {
            console.log('player moved it');
            this.refs.activeBlockamon.playerMoved();
            this.setState({
                player: player
            });
            
            $.ajax({
                url: '/battle/getplayerbattlestate',
                type: 'GET',
                dataType: 'json',
                data: { playerName: player.name },
                success: function(data) {
                    self.setState({
                        battleState: data.battleState
                    });
                    ea.trigger('updateBattleState', data.battleState);
                }
            });
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
            var player = this.state.player,
                   playerInBattle = this.state.battleState.inBattle || false;
            
            return (
                <div id="content">
                    <div id="gameArea"
                        ref="gameArea"
                        className={"gamearea grass"}>
                        { playerInBattle ?  <div id="battleArena">
                                                        <BattleBubble ref="battleBubble" player={player} />
                                                    </div> : null }
                        <Player ref="player" name={player.name}
                            nameChanged={this.playerNameChanged}/>
                        <Blockamon ref="activeBlockamon" elementType={"bug"} playerName={player.name} />
                        <Grass ref="grassOne" width={30} height={100} x={0} y={0} />
                    </div>
                </div>
            );
        }
    });
    
    React.render(<Index />, $('body')[0]);
    
    return Index;
});