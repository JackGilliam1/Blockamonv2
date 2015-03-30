jest.dontMock('../areacalculator.js');
describe('areacalculator', function() {
    var calculator = require('../areacalculator.js');
    
    it('two non-colliding boxes', function() {
        var boxOne = {
            dimensions: {
                width: 30,
                height: 50
            },
            position: {
                x: 0,
                y: 0
            }
        },
        boxTwo = {
            dimensions: {
                width: 50,
                height: 30
            },
            position: {
                x: 100,
                y: 500
            }
        };
        
        expect(calculator.squareContains(boxOne, boxTwo)).toBeFalsy();
    });
    
    it('two colliding boxes top-left', function() {
        var boxOne = {
            dimensions: {
                width: 30,
                height: 50
            },
            position: {
                x: 0,
                y: 0
            }
        },
        boxTwo = {
            dimensions: {
                width: 50,
                height: 30
            },
            position: {
                x: 5,
                y: 10
            }
        };
        
        expect(calculator.squareContains(boxOne, boxTwo)).toBeTruthy();
    });
    
    it('two colliding boxes top-right', function() {
        var boxOne = {
            dimensions: {
                width: 30,
                height: 50
            },
            position: {
                x: 40,
                y: 0
            }
        },
        boxTwo = {
            dimensions: {
                width: 50,
                height: 30
            },
            position: {
                x: 5,
                y: 22
            }
        };
        
        expect(calculator.squareContains(boxOne, boxTwo)).toBeTruthy();
    });
    
    it('two colliding boxes bottom-left', function() {
        var boxOne = {
            dimensions: {
                width: 30,
                height: 50
            },
            position: {
                x: 0,
                y: 10
            }
        },
        boxTwo = {
            dimensions: {
                width: 50,
                height: 30
            },
            position: {
                x: 0,
                y: 0
            }
        };
        
        expect(calculator.squareContains(boxOne, boxTwo)).toBeTruthy();
    });
    
    it('two colliding boxes bottom-right', function() {
        var boxOne = {
            dimensions: {
                width: 30,
                height: 50
            },
            position: {
                x: 35,
                y: 10
            }
        },
        boxTwo = {
            dimensions: {
                width: 50,
                height: 30
            },
            position: {
                x: 0,
                y: 0
            }
        };
        
        expect(calculator.squareContains(boxOne, boxTwo)).toBeTruthy();
    });
    
    it('builds dimensions correctly', function() {
        //topLeft (x: 0, y: 0), (y: 0, x: 30)  bottomLeft (x: 0, y: 50), (x: 30, y: 50)
        var boxOne = {
            dimensions: {
                width: 30,
                height: 50
            },
            position: {
                x: 5,
                y: 10
            }
        },
        dimOne = calculator.getBoxDimensions(boxOne);
        
        expect(dimOne.topLeft.x).toBe(5);
        expect(dimOne.topLeft.y).toBe(10);
        expect(dimOne.topRight.x).toBe(35);
        expect(dimOne.topRight.y).toBe(10);
        expect(dimOne.bottomLeft.x).toBe(5);
        expect(dimOne.bottomLeft.y).toBe(60);
        expect(dimOne.bottomRight.x).toBe(35);
        expect(dimOne.bottomRight.y).toBe(60);
    });
    
    it('point is within', function() {
        var point = { x: 25, y: 16 }
        boxOne = {
            dimensions: {
                width: 30,
                height: 50
           },
           position: {
                x: 5,
                y: 10
           }
        },
        dimOne = calculator.getBoxDimensions(boxOne);
        
        expect(dimOne.contains(point)).toBeTruthy();
    });
    
    it('point is not within', function() {
        var point = { x: 25, y: 5 }
        boxOne = {
           dimensions: {
                width: 30,
                height: 50
           },
           position: {
               x: 5,
               y: 10
           }
        },
        dimOne = calculator.getBoxDimensions(boxOne);
        
        expect(dimOne.contains(point)).toBeFalsy();
    });
});