var list = [];

function setList(fn) {
    list.push(fn);
}

function run() {
    if (list.length === 0)
        return;
    for (var i = 0; i < list.length; i++) {
        list[i]();
    }
    list.length = 0;
}


setInterval(function () {

    console.log(list.length);
    run();
}, 1000);