const MVVM = require('./mvvm')

var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        someStr: 'hello ',
        className: 'btn',
        someStr2:'<p>傻逼</p>'
    }
});

window.vm = vm;