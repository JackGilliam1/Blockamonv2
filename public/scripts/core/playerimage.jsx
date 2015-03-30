define('playerimage', ['react'], function(React) {
    var imgPaths = {
             none: 'none',
             left: 'left',
             right: 'right',
             up: 'up',
             down: 'down',
             downright: 'right',
             rightdown: 'down',
             downleft: 'left',
             leftdown: 'down',
             upright: 'right',
             rightup: 'up',
             upleft: 'left',
             leftup: 'up',
             calculateImgClass: function(direction) {
                var img = this[direction];
                if(img) {
                    return img;
                }
                if(direction.indexOf('right') != -1) {
                    return this.right;
                }
                if(direction.indexOf('left') != -1) {
                    return this.left;
                }
                return this.none;
             },
          };

    return React.createClass({
        propTypes: {
           direction: React.PropTypes.string.isRequired 
        },
        getInitialProps: function() {
           return {
                direction: 'none'
           };           
        },
        shouldComponentUpdate: function(nextProps) {
           return this.props.direction !== nextProps.direction; 
        },
        render: function() {
            var direction = this.props.direction,
                  img = imgPaths.calculateImgClass(direction) + ' playerimage';
            
            return (
                <span id="playerImage" className={img}></span>
            );
        }
    });
});