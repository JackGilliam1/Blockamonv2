jest.dontMock('../event-aggregator');
describe('eventaggregator', function() {
    var ea = require('../event-aggregator');
   
    it('added listeners receive events', function() {
        var listened = false,
            listener = function() {
                listened = true;
            },
            eventName = 'someEvent';
            
        ea.addListener(eventName, listener);
        
        ea.trigger(eventName);
        
        expect(listened).toBeTruthy('the listener did not receive the event');
    });
    
    it('listeners of one event dont trigger from other events', function() {
        var listenedToMine = false,
              listenedToOther = false,
              myListener = function() {
                  listenedToMine = true;
              },
              otherListener = function() {
                  listenedToOther = true;
              },
              eventOne = 'someEvent';
              
         ea.addListener(eventOne, myListener);
         ea.addListener( 'otherEvent', otherListener);
         
         ea.trigger(eventOne);
         
         expect(listenedToMine).toBeTruthy('the listener did not receive the event');
         expect(listenedToOther).toBeFalsy(eventOne + ' was handled by a listener not listening');
    });
    
    it('values are sent to listeners', function() {
        var valueSent = false,
              someObj = { nope: true },
              myListener = function(value) {
                  valueSent = value === someObj;
              },
              eventOne = 'someEvent';
              
         ea.addListener(eventOne, myListener);
         
         ea.trigger(eventOne, someObj);
         
         expect(valueSent).toBeTruthy('the listener did not receive the value');
    });
    
    it('can handle multiple listeners', function() {
        var receivedOne = false,
               receivedTwo = false,
               listenerOne = function() {
                   receivedOne = true;
               },
               listenerTwo = function() {
                   receivedTwo = true;
               },
               eventName = 'someEvent';
               
        ea.addListener(eventName, listenerOne);
        ea.addListener(eventName, listenerTwo);
        
        ea.trigger(eventName);
        
        expect(receivedTwo).toBeTruthy('Second listener did not receive event');
        expect(receivedOne).toBeTruthy('First listener did not receive event');
    });
    
    it('can handle null event name', function() {
        ea.addListener(null);
        ea.trigger();
    });
    
    it('can handle null listener', function() {
        var receivedOne = false,
               listener = function() {
                  receivedOne = true; 
               },
              eventName = 'someEvent';
        
        ea.addListener(eventName, listener);
        ea.addListener(eventName, null);
        
        ea.trigger(eventName);
        
        expect(receivedOne).toBeTruthy('Listener did not receive event');
    });
    
    it('event-aggregator is a singleton which can handle listeners from multiple require calls', function() {
        var sentOne = false,
               sentTwo = false,
               listenerOne = function() {
                   sentOne = true;
               },
               listenerTwo = function() {
                   sentTwo = true;
               },
               eventName = 'someEvent';
        
        ea = require('../event-aggregator');
        
        ea.addListener(eventName, listenerOne);
        
        ea = require('../event-aggregator');
        
        ea.addListener(eventName, listenerTwo);
        
        ea.trigger(eventName);
        
        expect(sentTwo).toBeTruthy('Second listener not triggered');
        expect(sentOne).toBeTruthy('First listener not triggered');
    });
});