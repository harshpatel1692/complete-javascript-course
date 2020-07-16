// ES5 vs ES6


//ES5 - Function scope
function driversLicense5(passedTest){
    if (passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName, yearOfBirth);
}
//ES6 - Block scope i.e. the scope is wherever the vars are declared.
//ES6 - CONST can't be declared without value and later assigned a value.
function driversLicense6(passedTest){
    let firstName;
    const yearOfBirth = 1990;
    if (passedTest){
        firstName = 'John';
    }
    console.log(firstName, yearOfBirth);
}

driversLicense5(true);
driversLicense6(true);

