var socket  = io();
var form    = document.getElementById('form');
var code    = document.getElementById('code');
var result  = document.getElementById('result');

var fail    = [
    'Essaye encore.',
    'Dommage.',
    'Petit caca.',
    'Babouche.',
    'Dora serait deçue de toi.',
    'Chipeur se moque toi.',
    'Flute.',
    'Saperlipopette.',
    'Urluberlu.'
];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (code.value) {
        socket.emit('try', code.value, function(loc){
            code.value = '';
            if(loc) return result.textContent = 'Localisation : ' + loc + "\n Taguez @entourloupeip quand vous le trouvez.";
            result.textContent = "Faux! " + fail[Math.floor(Math.random()*fail.length)]
        });
    }
});