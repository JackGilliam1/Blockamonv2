require('styles/battlebubblehealthbar.scss');
define('core/battlebubblehealthbar', ['react', './event-aggregator'],
function(React, ea) {
    var healthbar = React.createClass({
        getInitialState: function() {
           return {
                totalHealth: 1,
                currentHealth: 1
           };
        },
        updateHealthStats: function(healthData) {
            
        },
        componentWillMount: function() {
            ea.addListener('updateHealth', this.updateHealthStats);
        },
        render: function() {
            var totalHealth = this.state.totalHealth || 1,
                   currentHealth = this.state.currentHealth || 1,
                   healthbarSize = (currentHealth/totalHealth) * 100,
                   style = { width: healthbarSize + '%' },
                   status = healthbarSize < 50 ? (healthbarSize < 20 ? 'danger' : 'warning') : 'good';
            
            return (
                <div className="healthbar">
                    <div className="healthStat">{'HP ' + currentHealth + '/' + totalHealth}</div>
                        <div className="totalHealth">
                            <div className={"health " + status} style={style}>
                            </div>
                        </div>
                </div>
            );
        }
    });
    
    return healthbar;
});