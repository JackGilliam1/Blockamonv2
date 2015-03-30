
module.exports = {
    types: ['bug',
               'dark',
               'dragon',
               'electric',
               'fairy',
               'fighting',
               'fire',
               'flying',
               'ghost',
               'grass',
               'ground',
               'ice',
               'normal',
               'poison',
               'psychic',
               'rock',
               'steel',
               'water'],
    getRandomType: function() {
        return this.types[Math.floor(Math.random()*this.types.length)];
    },
    getType: function(index) {
        return this.types[index - 1];
    }
};