require('blockamon.scss');
define('blockamon', ['react', 'jquery'], function(React, $){
    
    return React.createClass({
        propTypes: {
           playerName: React.PropTypes.string.isRequired,
           elementType: React.PropTypes.string.isRequired
        },
        getInitialState: function() {
           return {
                position: { x: 0, y: 0, direction: 'none' }
           };
        },
        componentDidMount: function() {
            this.playerMoved(this.props.playerName);
        },
        componentDidUpdate : function() {
            $('#activeFieldBlockamon').stop().animate({ left: this.state.position.x, top: this.state.position.y }, { easing: 'linear' });
        },
        playerMoved: function(playerName) {
            var self = this;
            $.ajax({
                url: '/blockamon/getactiveblockamonposition',
                type: 'GET',
                data: { playerName: playerName || this.props.playerName },
                success: function(data) {
                    self.setState({
                        position: data.position
                    });
                }
            });
        },
        render: function() {
            var elementType = this.props.elementType,
                  position = this.state.position,
                  blockamonStyle = {
                    position: 'relative',
                    //left: '500px',
                    //top: '400px',
                  },
                  blockamonImageStyle = {
                    transform: 'rotate(' + (this.state.position.rotation) + 'deg)'
                  };
              
            return (
                <span id="activeFieldBlockamon"
                          className="active blockamon"
                          style={blockamonStyle}>
                    <span className={"blockamonimage " + elementType + " " + position.direction} style={blockamonImageStyle}></span>
                </span>
            );
        }
    });
});