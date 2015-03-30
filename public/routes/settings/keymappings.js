module.exports = {
    //87
    'w': 'up',
    //38
    '&': 'up',
    //83
    's': 'down',
    //37
    '(': 'down',
    //65
    'a': 'left',
    //40
    '%': 'left',
    //68
    'd': 'right',
    //39
    '\'': 'right',
    containsKey: function(keyCode) {
        return this[String.fromCharCode(keyCode).toLowerCase()] !== undefined;
    }
};