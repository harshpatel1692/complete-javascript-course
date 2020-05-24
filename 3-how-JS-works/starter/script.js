///////////////////////////////////////
// Lecture: Hoisting

/*Hoisting works for function declaration and NOT function expression
* Works:
*
* callingfunc(a, b);
*
* function callingfunc(a, b){
* return a+b
* }
*
*
* Doesn't work:
*
* callingfunc(a, b);
*
* var callingfunc = function (a, b){
* return a+b
* }
*
*
*
* */

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









