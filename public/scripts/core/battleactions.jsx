require('battleactions.scss');
define('core/battleactions', ['react', './battleactionshandler'],
function(React, actionsHandler) {
    var battleActions = React.createClass({
        render: function() {
            return (
                <div className="battleActions">
                    <button className="btn attack" onClick={actionsHandler.onAttack}>Attack</button>
                    <button className="btn item" onClick={actionsHandler.onItem}>Item</button>
                    <button className="btn run" onClick={actionsHandler.onRun}>Run</button>
                </div>
            );
        }
    });
    return battleActions;
});