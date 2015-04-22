jest.dontMock('../event-aggregator');
jest.dontMock('../battleactionshandler');
describe('battleactionshandler', function() {
    var actions = require('../battleactionshandler');
    var ea = require('../event-aggregator');
    
    it('should trigger battle:onAttack event', function() {
        var eventFired = false,
              listener = function() {
                  eventFired = true;
              },
              eventName = 'battle:onAttack';
              
        ea.addListener(eventName, listener);
        
        actions.onAttack();
        
        expect(eventFired).toBeTruthy('onAttack did not fire battle:onAttack');
    });
    
    it('should trigger battle:onItem event', function() {
        var eventFired = false,
              listener = function() {
                  eventFired = true;
              },
              eventName = 'battle:onItem';
              
        ea.addListener(eventName, listener);
        
        actions.onItem();
        
        expect(eventFired).toBeTruthy('onItem did not fire battle:onItem');
    });
    
    it('should trigger battle:onRun event', function() {
        var eventFired = false,
              listener = function() {
                  eventFired = true;
              },
              eventName = 'battle:onRun';
              
        ea.addListener(eventName, listener);
        
        actions.onRun();
        
        expect(eventFired).toBeTruthy('onRun did not fire battle:onRun');
    });
});