var damageMultipliers = require('./multipliers'),
       calculateDamage = function(level, attack, defense, base, modifier) {
           return (((2 * level + 10)/250) * (attack/defense) * base + 2) * modifier;
       };

module.exports = {
   calculateDamage: function(attacker, defender, moveUsed) {
        var modifier = damageMultipliers.calculateModifier(attacker.stats.type, defender.stats.type, moveUsed.type),
               damage = calculateDamage(attacker.stats.level, attacker.stats.attack,
                                                          defender.stats.defense, moveUsed.base, modifier.modifier);
        
        return {
            damage: damage,
            isCriticalHit: modifier.isCriticalHit
        };
   }
};