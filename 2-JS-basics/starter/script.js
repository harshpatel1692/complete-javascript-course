/**
var massMark = 78; // kg
var heightMark = 1.69; // meters

var massJohn = 92;
var heightJohn = 1.95;

var BMIMark = massMark / (heightMark * heightMark);
var BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

var markHigherBMI = BMIMark > BMIJohn;
console.log('Is Mark\'s BMI higher than John\'s? ' + markHigherBMI);
**/

/*If-Else conditions*/
/**
var firstName = 'Harsh';
var civilStatus = 'Married1';

if (civilStatus === 'Married'){
    console.log('The status of', firstName, 'is Married!');
} else if (civilStatus === 'Single') {
   console.log('The status of', firstName, 'is not Married!');
} else {
    console.log('The status of', firstName, 'is Unknown');
}
**/

/*Ternary Operator*/
/**
1>2 ? console.log('Value is Greater') : console.log('Value is Smaller');
var age = 20
var drink = age >=18 ? 'Age is Legal.' : 'Age is Minor.';

console.log(drink)
**/

/*Switch Statement*/
/**
var firstName = 'Harsh'
var job = 'teacher';
var isMale = 0


switch (job) {
    case 'teacher':
        console.log(firstName, 'is a Teacher');
        break;
    case 'driver':
        console.log(firstName, 'is a Teacher');
        break;
    case 'programmer':
        console.log(firstName, 'is a Teacher');
        break;
    default:
        console.log(firstName, 'job is unknown');
}

if (!isMale){
    console.log('testing \'Not True\' condition');
}

**/

/**Coding Challenge 2 **/

var johnAvg = (10+23+5)/3
var mikeAvg = (6+34+23)/3


if (johnAvg>mikeAvg) {
    console.log('John\'s team won!');
} else if (johnAvg<mikeAvg){
    console.log('Mike\'s team won!');
} else {
    console.log('There is a draw!');
}


/** Functions **/

function addNumbers(a, b){
    return a+b
}
function mulNumbers(a, b){
    return a*b
}

console.log(addNumbers(5, 6));


/**Arrays**/
var array_ = ['Harsh', 'Patel', 2000, '23']

console.log(array_.length)
console.log(array_.indexOf(2000))


console.log(array_.indexOf('not there') === -1)


/*Objects and Methods*/
var john = {
    firstName:'Harsh',
    lastName:'Patel',
    birthYear: 1992,
    family: ['jack', 'jill'],
    job: 'programmer',
    isMarried: true,
}

console.log(john.firstName);
console.log(john['lastName']);

/*Method is function within object and the keys of the object are accessed using
* 'this' keyword
* */
var objectJohn = {
    fullName: 'John',
    mass: 120,
    height: 65,
    calcBMI: function(){
        this.BMI = this.mass/(this.height**2)
        return this.BMI
    }
}



johnBMI = objectJohn.mass/objectJohn.height**2

console.log('John\'s BMI is', johnBMI)
console.log('John\'s BMI using method:', objectJohn.calcBMI())

/*Loops and Iterations*/
for (var i=0; i<10; i++){
    console.log('Loop value:', i);
    i+=1;
}


var array_ = ['Harsh', 'Patel', 2000, '23']

for (var i=0; i<array_.length; i++){
    console.log('Loop value:', array_[i]);
}
/*
var i = 0;
while(i<array_.length){
    console.log('While loop:', array_[i])
    i++;
}*/


for (var i=0; i<array_.length; i++){
    console.log('Type of', array_[i], 'is', typeof array_[i]);
}
console.log('------------------------------------------------------')
for (var i=0; i<array_.length; i++){
    if (typeof array_[i] !== 'number') continue;
    console.log('Type of', array_[i], 'is', typeof array_[i]);
}

console.log('------------------------------------------------------')

for (var i=0; i<array_.length; i++){
    if (typeof array_[i] !== 'string') break;
    console.log('Type of', array_[i], 'is', typeof array_[i]);
}