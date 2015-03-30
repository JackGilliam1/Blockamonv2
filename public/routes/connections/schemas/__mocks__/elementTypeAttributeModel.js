var types = [
    {
        _id: 'fairy',
        strongAttack: ['dark', 'dragon', 'fighting'],
        weakAttack: ['fire', 'poison', 'steel'],
        strongDefense: ['bug', 'dark', 'fighting'],
        weakDefense: ['poison', 'steel'],
        immuneDefense: ['dragon']
    },
    {
        _id: 'flying',
        strongAttack: ['bug', 'fighting', 'grass'],
        weakAttack: ['electric', 'rock', 'steel'],
        strongDefense: ['bug', 'fighting', 'grass'],
        weakDefense: ['electric', 'ice', 'rock'],
        immuneDefense: ['ground']
    }
],
getAttributesFor = function(elementType) {
    var i, type;
    for(i = 0; i < types.length; i++) {
        type = types[i];
        if(type.elementType === elementType) {
            return type;
        }
    }
    return undefined;
};

var elementTypeAttributesMock = {
    find: function(data, callback) {
        if(data.elementType) {
            callback(undefined, [getAttributesFor(data.elementType)]);
            return;
        }
        callback(undefined, types);
    }
};

module.exports = elementTypeAttributesMock;