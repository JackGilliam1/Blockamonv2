var boxMissingRequiredValues = function(box) {
            return box.dimensions === undefined
                        || box.position === undefined
                        || box.dimensions.width === undefined
                        || box.position.x === undefined
                        || box.dimensions.height === undefined
                        || box.position.y === undefined;
        };

module.exports = {
    getBoxDimensions: function(box) {
           var width = box.dimensions.width,
                  height = box.dimensions.height,
                  x = box.position.x,
                  y = box.position.y;
           
          return {
             topLeft: { x: x, y: y },
             topRight: { x: x + width, y: y },
             bottomLeft: { x: x, y: y + height },
             bottomRight: {x: x + width, y: y + height },
             intersectsWith: function(boxDimensions) {
                 return this.contains(boxDimensions.topLeft)
                            || this.contains(boxDimensions.topRight)
                            || this.contains(boxDimensions.bottomLeft)
                            || this.contains(boxDimensions.bottomRight);
             },
             contains: function(point) {
                 return this.topLeft.x <= point.x
                             && this.topRight.x >= point.x
                             && this.topLeft.y <= point.y
                             && this.bottomLeft.y >= point.y;
             }
          };
   },
   squareContains: function(boxOne, boxTwo) {
       var boxOneDimensions, boxTwoDimensions;
       
       if(boxMissingRequiredValues(boxOne) || boxMissingRequiredValues(boxTwo)) {
           console.error('Missing required values, need to have (width, x, height, y)');
           return false;
       }
       boxOneDimensions = this.getBoxDimensions(boxOne);
       boxTwoDimensions = this.getBoxDimensions(boxTwo);
       return boxOneDimensions.intersectsWith(boxTwoDimensions);
   } 
};