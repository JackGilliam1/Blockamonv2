define('playernameedit', ['react', 'jquery'], function(React, $) {
    
    return React.createClass({
        getInitialState: function() {
           return {
                hasError: false
           }           
        },
        propTypes: {
            name: React.PropTypes.string.isRequired,
            playerNameUpdated: React.PropTypes.func.isRequired,
            doneEditing: React.PropTypes.func
        },
        componentDidMount: function(e) {
            React.findDOMNode(this.refs.playerNameEdit).focus();
        },
        updateName: function(e) {
            var newName = $(e.target)[0].value;
            if(e.type === 'blur') {
                this.setState({
                    hasError: false
                });
            }
            else if(newName.trim() === '') {
                this.setState({
                    hasError: true
                });
            }
            else {
                this.setState({
                    hasError: false
                });
                this.props.playerNameUpdated(this.props.name, newName);
                this.endEdit();
            }
            e.stopPropagation();
        },
        endEdit: function() {
            this.setState({
                hasError: false
            });
            if(this.props.doneEditing) {
                this.props.doneEditing();
            }
        },
        submit: function(e) {
            //Enter Key = 13
            if(e.keyCode === 13) {
                this.updateName(e);
            }
            e.stopPropagation();
        },
        render: function() {
            var playerName = this.props.name,
                  hasError = this.state.hasError;
            
            return (
                <input id="playerNameEdit"
                           ref="playerNameEdit"
                           autofocus
                           className={hasError ? 'error' : ''}
                           onKeyDown={this.submit}
                           onBlur={this.endEdit}
                           defaultValue={playerName}>
                </input>
            );
        }
    });
});