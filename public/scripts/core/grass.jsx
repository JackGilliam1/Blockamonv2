require('grass.scss');
define('grass', [
    'react',
    'jquery'
],
 function(React, $) {
    
    return React.createClass({
        propTypes: {
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired,
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired
        },
        adjust: function(dimension) {
            var imageSideSize = 30;
           return Math.floor((dimension ||  imageSideSize)/ imageSideSize) * imageSideSize;
        },
        render: function() {
            var style = {
               width: this.adjust(this.props.width) + '%',
               height: this.adjust(this.props.height) + '%',
               left: this.props.x + 'px',
               top: this.props.y + 'px'
            };
            
            return (
                <span className="grass" style={style}><span className="grassPiece"></span></span>
            );
        }
    });
});