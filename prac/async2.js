function aFunc() {
    setTimeout(function () {
        console.log('a');
    },1700) //1.7초 뒤에
}
function bFunc() {
    setTimeout(function () {
        console.log('b');
    },1000) //1초 뒤에
}
function cFunc() {
    setTimeout(function () {
        console.log('c');
    },500) //0.5초 뒤에
}
aFunc();
bFunc();
cFunc();