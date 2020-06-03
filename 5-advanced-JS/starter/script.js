//Object.create
var personProto = {
    calculateAge: function(){
        console.log(2020-this.yearOfBirth)
    }

}

var john = Object.create(personProto);

john.name = 'John';
john.yearOfBirth = 1992;



//Primitives
var a = 23;
var b = a;

a = 1;
console.log(a);
console.log(b);



var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1

obj1.age = 30;

console.log(obj1);
console.log(obj2);


//IIFE  - Immediately Invoked Function Expressions
(
    function (){
        var a = 5;
        var b = 6;
        console.log(a*b);
    }
)();

//Closures

//This is function returning function  - to be converted to Closures
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}
*/

//convert function to closure
function interviewQuestion(job) {
    return function(name){
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('designer')('John');