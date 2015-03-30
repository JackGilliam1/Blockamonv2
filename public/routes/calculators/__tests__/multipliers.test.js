jest.dontMock('../multipliers');
describe('multipliers', function() {
    var multipliers,
           multiplierValues = require('multipliervalues');
    
    beforeEach(function() {
        multipliers = require('../multipliers');
    });
    
    it('should calculate type advantage', function() {
        var attackingType = 'poison',
               defendingType = 'fairy',
               multiplier = multipliers.getTypeMultiplier(attackingType, defendingType);
               
        expect(multiplier.multiplier).toBe(multiplierValues.typeAdvantage);
        expect(multiplier.superEffective).toBeTruthy();
    });
    
    it('should calculate type disadvantage', function() {
        var attackingType = 'fighting',
               defendingType = 'flying',
               multiplier = multipliers.getTypeMultiplier(attackingType, defendingType);
               
        expect(multiplier.multiplier).toBe(multiplierValues.typeDisadvantage);
        expect(multiplier.superEffective).toBeFalsy();
    });
    
    it('should calculate type immunity', function() {
        var attackingType = 'dragon',
               defendingType = 'fairy',
               multiplier = multipliers.getTypeMultiplier(attackingType, defendingType);
               
        expect(multiplier.multiplier).toBe(multiplierValues.typeImmune);
        expect(multiplier.superEffective).toBeFalsy();
    });
    
    it('should calculate type normal', function() {
        var attackingType = 'normal',
               defendingType = 'fairy',
                multiplier = multipliers.getTypeMultiplier(attackingType, defendingType);
                
         expect(multiplier.multiplier).toBe(multiplierValues.baseMultiplier);
         expect(multiplier.superEffective).toBeFalsy();
    });
    
    it('should calculate STAB', function() {
        var attackingType = 'fighting',
              moveType = 'fighting',
              multiplier = multipliers.getStabMultiplier(attackingType, moveType);
              
        expect(multiplier).toBe(1.5);
    });
    
    it('should calculate non STAB', function() {
        var attackingType = 'fighting',
               moveType = 'normal',
               multiplier = multipliers.getStabMultiplier(attackingType, moveType);
               
        expect(multiplier).toBe(multiplierValues.baseMultiplier);
    });
    
    it('should calculate criticalHit', function() {
        multipliers.isCriticalHit = function() {
           return true;
        };
        
        var multiplier = multipliers.getCriticalHitMultiplier();
        
        expect(multiplier.multiplier).toBe(multiplierValues.criticalHitMultiplier);
        expect(multiplier.isCriticalHit).toBeTruthy();
    });
    
    it('should calculate non criticalHit', function() {
        multipliers.isCriticalHit = function() {
           return false; 
        };
        
        var multiplier = multipliers.getCriticalHitMultiplier();
        
        expect(multiplier.multiplier).toBe(multiplierValues.baseMultiplier);
        expect(multiplier.isCriticalHit).toBeFalsy();
    });
    
    it('should calculate type advantage for move', function() {
        multipliers.isCriticalHit = function() {
           return false; 
        };
        multipliers.getRandomMultiplier = function() {
           return multiplierValues.baseMultiplier; 
        };
        var attackingType = 'dragon',
               defendingType = 'fairy',
               moveType = 'poison',
               modifier = multipliers.calculateModifier(attackingType, defendingType, moveType);
               
        expect(modifier.modifier).toBe(2);
        expect(modifier.isCriticalHit).toBeFalsy();
        expect(modifier.isSuperEffective).toBeTruthy();
    });
    
    it('should calculate type immunity for move', function() {
        multipliers.isCriticalHit = function() {
           return false; 
        };
        multipliers.getRandomMultiplier = function() {
           return multiplierValues.baseMultiplier; 
        };
        var attackingType = 'poison',
               defendingType = 'fairy',
               moveType = 'dragon',
               modifier = multipliers.calculateModifier(attackingType, defendingType, moveType);
               
        expect(modifier.modifier).toBe(0);
        expect(modifier.isCriticalHit).toBeFalsy();
        expect(modifier.isSuperEffective).toBeFalsy();
    });
});