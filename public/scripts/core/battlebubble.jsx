require('battlebubble.scss');
define('core/battlebubble', ['react', './battlebubblehealthbar', './battleactions'],
 function(React, BattleBubbleHealthbar, BattleActions) {
    var battleBubble = React.createClass({
        propTypes: {
            player: React.PropTypes.object.isRequired,
            onAttack: React.PropTypes.func.isRequired,
            onItem: React.PropTypes.func.isRequired,
            onRun: React.PropTypes.func.isRequired
        },
        render: function() {
            var player = this.props.player,
                  onAttack = this.props.onAttack,
                  onItem = this.props.onItem,
                  onRun = this.props.onRun;
            
            return (
                <span id="battleBubble" className="bubble">
                    <BattleBubbleHealthbar player={player} />
                    <BattleActions onAttack={onAttack} onItem={onItem} onRun={onRun} />
                </span>
            );
        }
    });
    
    return battleBubble;
});