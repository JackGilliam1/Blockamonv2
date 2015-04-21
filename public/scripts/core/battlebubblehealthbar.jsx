require('styles/battlebubblehealthbar.scss');
define('core/battlebubblehealthbar', ['react'],
function(React) {
    var healthbar = React.createClass({
        getInitialState: function() {
           return {
                totalHealth: 50,
                currentHealth: 20
           };
        },
        increase: function() {
            var currentHealth = this.state.currentHealth + 2;
            if(currentHealth > this.state.totalHealth) {
                currentHealth = this.state.totalHealth;
            }
            this.setState({
                currentHealth: currentHealth
            });
        },
        decrease: function() {
            var currentHealth = this.state.currentHealth - 2;
            if(currentHealth <= 0) {
                currentHealth = 1;
            }
            this.setState({
                currentHealth: currentHealth
            });
        },
        render: function() {
            var totalHealth = this.state.totalHealth || 50,
                   currentHealth = this.state.currentHealth || 20,
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