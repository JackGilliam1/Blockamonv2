var ElementTypeAttribute = require('elementTypeAttributeModel'),
       multiplierValues = require('multipliervalues'),
       elementAttributes = {
           elementTypeAttributes: [],
           getAttributes: function(type) {
               var i, attribute;
               for(i = 0; i < this.elementTypeAttributes.length; i++) {
                   attribute = this.elementTypeAttributes[i];
                    if(attribute._id === type) {
                        return attribute;
                    }
               }
               return undefined;
           }
       },
       getElementAttributesFor = function(elementType) {
           return elementAttributes.getAttributes(elementType);
       };

ElementTypeAttribute.find({}, function(err, elementTypes) {
    if(elementTypes) {
        elementAttributes.elementTypeAttributes = elementTypes;
    }
});

module.exports = {
    getTypeMultiplier: function(attackingType, defendingType) {
        var defendingAttributes = getElementAttributesFor(defendingType),
               multiplier = multiplierValues.baseMultiplier,
               superEffective = false,
               ineffective = false;
        
        if(defendingAttributes.immuneDefense.indexOf(attackingType) != -1) {
            multiplier =  multiplierValues.typeImmune;
        }
        else if(defendingAttributes.strongDefense.indexOf(attackingType) != -1) {
            multiplier = multiplierValues.typeDisadvantage;
            ineffective = true;
        }
        else if(defendingAttributes.weakDefense.indexOf(attackingType) != -1) {
            multiplier = multiplierValues.typeAdvantage;
            superEffective = true;
        }
        return {
            multiplier: multiplier,
            superEffective: superEffective,
            ineffective: ineffective
        };
    },
    getStabMultiplier: function(attackerType, moveType) {
        return attackerType === moveType ? multiplierValues.stabMultiplier : multiplierValues.baseMultiplier;
    },
    getRandomMultiplier: function() {
        return (Math.random() * (multiplierValues.randomFactorMax - multiplierValues.randomFactorMin)) + multiplierValues.randomFactorMin;
    },
    isCriticalHit: function() {
       return Math.random() <= multiplierValues.criticalHitBase; 
    },
    getCriticalHitMultiplier: function() {
        var isCriticalHit = this.isCriticalHit();
        return {
            multiplier: isCriticalHit ? multiplierValues.criticalHitMultiplier : multiplierValues.baseMultiplier,
            isCriticalHit: isCriticalHit
        };
    },
    calculateModifier: function(attackerType, defenderType, moveType) {
            var typeData = this.getTypeMultiplier(moveType, defenderType),
                    stab = this.getStabMultiplier(attackerType, moveType),
                    random = this.getRandomMultiplier(),
                    criticalHitData = this.getCriticalHitMultiplier();
                    
           return {
                modifier: Math.floor(stab * typeData.multiplier * criticalHitData.multiplier * random),
                isCriticalHit: criticalHitData.isCriticalHit,
                isSuperEffective: typeData.superEffective,
                isIneffective: typeData.isIneffective
           };
    }
};

       
