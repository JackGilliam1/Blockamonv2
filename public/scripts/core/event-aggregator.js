var listeners = {},
      eventAggregator = undefined;

function EventAggregator() {};

EventAggregator.prototype = {
   addListener: function(event, listener) {
        if(!event || !listener) {
            console.log('event or listener was undefined');
            return;
        }
        if(!listeners[event]) {
            listeners[event] = [listener];
        }
        else {
            listeners[event].push(listener);
        }
    },
    trigger: function(event, value) {
        var i,
              handlers = listeners[event],
              handler;
        if(handlers) {
            for(i = 0; i < handlers.length; i++) {
                handler = handlers[i];
                handler(value);
            }
            return true;
        }
        return false;
    }
};

EventAggregator.getInstance = function() {
    if(!eventAggregator) {
        eventAggregator = new EventAggregator();
    }
    return eventAggregator;
};

module.exports = EventAggregator.getInstance();