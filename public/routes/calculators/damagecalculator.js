var damageMultipliers = require('multipliers'),
       calculateDamage = function(level, attack, defense, base, modifier) {
           return (((2 * level + 10)/250) * (attack/defense) * base + 2) * modifier;
       },
       calculateModifier = function(attackerType, defenderType, moveType) {
           var type = damageMultipliers.getTypeMultiplierFor(attackerType, defenderType);
           var stab = damageMultipliers.getStabMultiplier(attackerType, moveType);
           var random = damageMultipliers.getRandomMultiplier();
           var criticalHit = damageMultipliers.getCriticalHitMultiplier();
           
           return Math.floor(stab * type * random * criticalHit);
       };

module.exports = {
   calculateDamage: function(attacker, defender, moveUsed) {
        var attackerType = attacker.stats.type,
               defenderType = defender.stats.type,
               modifier = calculateModifier(attackerType, defenderType, moveUsed.type);
        
        return calculateDamage(attacker.stats.level,
                                              attacker.stats.attack,
                                              defender.stats.defense,
                                              moveUsed.base,
                                              modifier);
   }
};