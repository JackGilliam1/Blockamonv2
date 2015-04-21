require('battleactions.scss');
define('core/battleactions', ['react'],
function(React) {
    var battleActions = React.createClass({
        propTypes: {
            onAttack: React.PropTypes.func.isRequired,
            onItem: React.PropTypes.func.isRequired,
            onRun: React.PropTypes.func.isRequired
        },
        render: function() {
            var onAttack = this.props.onAttack,
                   onItem = this.props.onItem,
                   onRun = this.props.onRun;
            
            return (
                <div className="battleActions">
                    <button className="btn attack" onClick={onAttack}>Attack</button>
                    <button className="btn item" onClick={onItem}>Item</button>
                    <button className="btn run" onClick={onRun}>Run</button>
                </div>
            );
        }
    });
    return battleActions;
});