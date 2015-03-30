require('player.scss');
define('player', ['react', 'jquery', './playerimage', './playernameedit'], function(React, $,
 PlayerImage, PlayerNameEdit) {
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
                position: { x: 0, y: 0, direction: 'none' },
                isEditing: false
            };
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
           this.props.playerNameChanged(oldName, newName);
           this.setState({
               isEditing: false
           });
        },
        rename: function(e) {
            this.setState({
                isEditing: true
            });
        },
        render: function() {
            var playerName = this.props.name,
                  position = this.state.position;
                  playerStyle = {
                      position: 'relative',
                      left: position.x+ 'px',
                      top: position.y + 'px'
                  },
                  editing = this.state.isEditing,
                  onBlur = this.props.onBlur;
            
            return (
                <span id="player"
                    className="player"
                    style={playerStyle}
                    onClick={this.rename}>
                    { editing ? null : <PlayerImage direction={position.direction}/> }
                    { editing ? <PlayerNameEdit name={playerName} playerNameUpdated={this.playerNameUpdated} doneEditing={this.doneEditing} /> : null }
                </span>
            );
        }
    });
});