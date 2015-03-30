var ElementTypeAttribute = require('../connections/schemas/elementTypeAttributeModel'),
       elementAttributes = {
           elementTypeAttributes: [],
           getAttributes: function(type) {
               var i, attribute;
               for(i = 0; i < this.elementTypeAttributes.length; i++) {
                   attribute = this.elementTypeAttributes[i];
                    if(attribute.elementType === type) {
                        return attribute;
                    }
               }
               return undefined;
           }
       },
       getElementAttributesFor = function(elementType, elementTypeAttributeLoaded) {
           elementTypeAttributeLoaded(elementAttributes.getAttributes(elementType));
       },
       multiplierValues = {
            baseMultiplier: 1,
            criticalHitBase: 0.0625,
            criticalHitMultiplier: 1.5,
            randomFactorMin: 0.85,
            randomFactorMax: 1,
            stabMuliplier: 1.5,
            typeAdvantage: 2,
            typeDisadvantage: 0.5,
            typeImmune: 0
       };

ElementTypeAttribute.find({}, function(err, elementTypes) {
   elementAttributes.elementTypeAttributes = elementTypes;
});

module.exports = {
    getTypeMultiplierFor: function(attackingType, defendingType) {
        var defendingAttributes = getElementAttributesFor(defendingType);
        if(defendingAttributes.immuneDefense.indexOf(attackingType) != -1) {
            return multiplierValues.typeImmune;
        }
        else if(defendingAttributes.strongDefense.indexOf(attackingType) != -1) {
            return multiplierValues.typeDisadvantage;
        }
        else if(defendingAttributes.weakDefense.indexOf(attackingType) != -1) {
            return multiplierValues.typeAdvantage;
        }
        return multiplierValues.baseMultiplier;
    },
    getStabMultiplier: function(attackerType, moveType) {
        return attackerType === moveType ? multiplierValues.stabMultiplier : multiplierValues.baseMultiplier;
    },
    getRandomMultiplier: function() {
        return (Math.random() * (multiplierValues.randomFactorMax - multiplierValues.randomFactorMin)) + multiplierValues.randomFactorMin;
    },
    getCriticalHitMultiplier: function() {
        return Math.random() <= multiplierValues.criticalHitBase ? multiplierValues.criticalHitMultiplier : multiplierValues.baseMultiplier;
    }
};

       
