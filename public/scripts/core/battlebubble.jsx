require('battlebubble.scss');
define('core/battlebubble', ['react', './battlebubblehealthbar', './battleactions'],
 function(React, BattleBubbleHealthbar, BattleActions) {
    var battleBubble = React.createClass({
        propTypes: {
            player: React.PropTypes.object.isRequired
        },
        render: function() {
            var player = this.props.player;
            
            return (
                <span id="battleBubble" className="bubble">
                    <BattleBubbleHealthbar player={player} />
                    <BattleActions />
                </span>
            );
        }
    });
    
    return battleBubble;
});