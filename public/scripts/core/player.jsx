require('player.scss');
define('player', [
        'react',
        'jquery',
        './playerimage',
        './playernameedit',
        'keymappings',
        './event-aggregator'
     ],
function(React, $, PlayerImage, PlayerNameEdit, keyMappings, ea) {
    return React.createClass({
        propTypes: {
           name: React.PropTypes.string.isRequired
        },
        getDefaultProps: function() {
           return {
                name: 'test'
           };
        },
        getInitialState: function() {
            return {
                ownedBlockamon: [],
                position: { x: 0, y: 0, direction: 'none' },
                isEditing: false,
                inBattle: false
            };
        },
        keysPressed: {},
        doKeyDown: function(e) {
            if(this.state.isEditing) {
                return;
            }
            if(keyMappings.containsKey(e.keyCode)) {
                e.preventDefault();
            }
            else {
                return;
            }
            this.keysPressed[e.keyCode] = true;
            this.sendKeys(Object.keys(this.keysPressed));
        },
        doKeyUp: function(e) {
            if(this.state.isEditing) {
                return;s
            }
            delete this.keysPressed[e.keyCode];
            if(!keyMappings.containsKey(e.keyCode)) {
                return;
            }
            this.sendKeys(Object.keys(this.keysPressed));
        },
        sendKeys: function(keys) {
            if(this.state.inBattle) {
                return;
            }
            var self = this;
            if(keys.length > 0) {
                $.ajax({
                    url: '/movement/buttonpushed',
                    type: 'POST',
                    data: {
                        keys: keys,
                        playerName: self.props.name
                    },
                    success: function(player) {
                        self.setState({
                            position: player.position
                        });
                        ea.trigger('playerMoved', player);
                    }
                });
            }
        },
        componentWillMount: function() {
           ea.addListener('updateBattleState', this.updateBattleState);
        },
        componentDidMount: function() {
           $(document).keydown(this.doKeyDown).keyup(this.doKeyUp);
        },
        componentWillReceiveProps: function(nextProps) {
            var playerName = nextProps.name,
                  self = this;
            
            $.ajax({
                url: '/player/getplayerposition',
                type: 'GET',
                dataType: 'json',
                data: { playerName: playerName },
                success: function(data) {
                    self.setState({
                        position: data.position
                    });
                }
            });
        },
        doneEditing: function() {
            this.setState({
                isEditing: false
            });
            if(this.props.onBlur) {
                this.props.onBlur();
            }
        },
        playerNameUpdated: function(oldName, newName) {
           this.props.nameChanged(oldName, newName);
           this.setState({
               isEditing: false
           });
        },
        updateBattleState: function(battleState) {
           this.setState({
                inBattle: battleState.inBattle
           });
        },
        rename: function(e) {
            if(this.state.inBattle) {
                return;
            }
            this.setState({
                isEditing: true
            });
        },
        render: function() {
            var playerName = this.props.name,
                  inBattle = this.state.inBattle,
                  position = this.state.position;
                  playerStyle = {
                      position: 'relative',
                      left: position.x+ 'px',
                      top: position.y + 'px'
                  },
                  editing = this.state.isEditing && !inBattle,
                  onBlur = this.props.onBlur;
            
            return (
                <span id="player"
                    className="player"
                    style={playerStyle}
                    onClick={this.rename}>
                    { editing ? <PlayerNameEdit name={playerName} playerNameUpdated={this.playerNameUpdated} doneEditing={this.doneEditing} /> : <PlayerImage direction={position.direction}/> }
                </span>
            );
        }
    });
});